import Anthropic from '@anthropic-ai/sdk';

// Only /api/* reaches this Worker — see `assets.run_worker_first` in
// wrangler.jsonc. Documentation pages are served straight from the static
// assets and never pass through here, so a fault in the chatbot cannot take
// the docs down with it.

// Overridable from the Cloudflare dashboard without touching code. Measured
// cost per question on this workload once retrieval replaced web search:
// claude-haiku-4-5 ~$0.0045, claude-sonnet-5 ~$0.009. Before retrieval it was
// $0.022 on Haiku, because every question dragged whole pages into context.
const MODEL_DEFAULT = 'claude-haiku-4-5';

// The same weights the index was built with (BAAI/bge-m3 in
// scripts/chatbot/build_index.py). Vectors from two different models are not
// comparable, and the failure mode is silent — no error, just confidently
// irrelevant answers. Change this and the notebook in the same commit.
const EMBED_MODEL = '@cf/baai/bge-m3';

const TOP_K = 8;

// Cosine similarity below which a match is treated as noise rather than
// context. Deliberately permissive: the system prompt already forbids
// answering outside the supplied context, so letting a weak match through
// costs a few tokens, while cutting a good one costs an answer. Calibrate
// against the scores step 9 of the notebook prints for known-good questions.
const MIN_SCORE = 0.3;

// Enough for the ~200-word answer the prompt asks for. 1024 was measured
// cutting answers mid-sentence.
const MAX_TOKENS = 2048;

const MAX_QUERY_CHARS = 500;
// Two exchanges back. Retrieved context is not replayed — only the visible
// turns are — so follow-ups stay cheap, which they were not while search
// results had to be echoed back verbatim.
const MAX_HISTORY_MESSAGES = 4;

// Repeated questions are the cheapest possible answer: free. Module scope, so
// it lives as long as the isolate — lost on cold start, not shared between
// instances. It trims bursts of the same question rather than guaranteeing a
// hit; a KV namespace would make it durable if that ever proves worth it.
const CACHE_MAX_ENTRIES = 200;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const answerCache = new Map();

const SYSTEM_PROMPT = `You are the HARDWARIO documentation assistant.

Answer ONLY from the context passages provided in the user's message. They come
from HARDWARIO's documentation, website and online store. If the answer is not
in them, say: "I could not find this information. Try searching docs.hardwario.com."
Never fill gaps from prior knowledge, and never invent a URL.

Cite the pages you used by linking their titles in Markdown.
Prices and stock come from a snapshot refreshed monthly — quote them as
indicative and link to the product page for the current figure.

Answer in at most 200 words. Be concise, accurate and friendly.
Always respond in English.`;

function cacheKey(query) {
  return query.trim().toLowerCase().replace(/\s+/g, ' ');
}

function readCache(query) {
  const key = cacheKey(query);
  const hit = answerCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > CACHE_TTL_MS) {
    answerCache.delete(key);
    return null;
  }
  return hit.payload;
}

function writeCache(query, payload) {
  const key = cacheKey(query);
  answerCache.delete(key);
  answerCache.set(key, { at: Date.now(), payload });
  // Map preserves insertion order, so the first key is the oldest.
  while (answerCache.size > CACHE_MAX_ENTRIES) {
    answerCache.delete(answerCache.keys().next().value);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Same-origin: the widget is served from docs.hardwario.com and calls
// /api/chat on that same host, so there is no CORS preflight and no origin
// allowlist to maintain. The spend ceiling is the budget limit on the
// Anthropic key, which is where it belonged all along.

async function retrieve(env, query) {
  const embedding = await env.AI.run(EMBED_MODEL, { text: [query] });
  const vector = embedding.data[0];

  const result = await env.VECTORIZE.query(vector, {
    topK: TOP_K,
    returnMetadata: 'all',
  });

  return result.matches
    .filter((m) => m.score >= MIN_SCORE && m.metadata?.text)
    .map((m) => ({
      score: m.score,
      url: m.metadata.url,
      title: m.metadata.title,
      site: m.metadata.site,
      text: m.metadata.text,
    }));
}

function buildUserMessage(passages, query) {
  const context = passages
    .map((p, i) => `[${i + 1}] ${p.title} — ${p.url}\n${p.text}`)
    .join('\n\n---\n\n');

  return `Context passages:\n\n${context}\n\n---\n\nQuestion: ${query}`;
}

// The widget sends the turns it has on screen. Those never contained the
// context block, so replaying them costs a few hundred tokens rather than
// re-billing every passage retrieved earlier in the conversation.
function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  const turns = history
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim(),
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  // The API rejects a conversation that opens on an assistant turn, and a
  // fixed-size window off the end of a running chat lands on one half the
  // time. Drop the orphaned reply rather than send a request that 400s.
  while (turns.length && turns[0].role === 'assistant') turns.shift();
  return turns;
}

async function handleChat(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const query = typeof body?.query === 'string' ? body.query.trim() : '';
  if (!query) return json({ error: 'Missing question' }, 400);
  if (query.length > MAX_QUERY_CHARS) return json({ error: 'Question is too long' }, 400);

  const history = sanitizeHistory(body?.history);

  // Only cache standalone questions. A follow-up means the same words can need
  // a different answer depending on what came before.
  if (history.length === 0) {
    const cached = readCache(query);
    if (cached) {
      console.log(JSON.stringify({ cache: 'hit' }));
      return json({ ...cached, cached: true });
    }
  }

  const passages = await retrieve(env, query);

  // Nothing relevant in the index: say so without paying for a model call.
  if (passages.length === 0) {
    console.log(JSON.stringify({ retrieved: 0, query_len: query.length }));
    return json({
      answer:
        'I could not find this information. Try searching docs.hardwario.com or rephrase your question.',
      sources: [],
    });
  }

  const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const response = await anthropic.messages.create({
    model: env.CHAT_MODEL || MODEL_DEFAULT,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [...history, { role: 'user', content: buildUserMessage(passages, query) }],
  });

  console.log(
    JSON.stringify({
      model: response.model,
      stop_reason: response.stop_reason,
      retrieved: passages.length,
      top_score: Number(passages[0].score.toFixed(3)),
      history: history.length,
      input_tokens: response.usage?.input_tokens,
      output_tokens: response.usage?.output_tokens,
    }),
  );

  if (response.stop_reason === 'refusal') {
    return json({
      answer:
        'I cannot answer that question. Please ask something about HARDWARIO products or documentation.',
      sources: [],
    });
  }

  const answer = response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim();

  if (!answer) {
    return json({
      answer:
        'I could not find this information. Try searching docs.hardwario.com or rephrase your question.',
      sources: [],
    });
  }

  // Deduplicated by URL, in retrieval order, so the strongest match leads.
  const sources = [];
  const seen = new Set();
  for (const p of passages) {
    if (seen.has(p.url)) continue;
    seen.add(p.url);
    sources.push({ url: p.url, title: p.title, site: p.site });
  }

  const payload = { answer, sources, truncated: response.stop_reason === 'max_tokens' };
  // Never cache a truncated answer — it would be served over and over.
  if (history.length === 0 && !payload.truncated) writeCache(query, payload);

  return json(payload);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname !== '/api/chat') return json({ error: 'Not found' }, 404);

    try {
      return await handleChat(request, env);
    } catch (err) {
      console.error('Chat error:', err);

      // 402 billing_error: out of credit, or a spend limit was hit. Requests
      // are rejected before inference, so hitting it repeatedly costs nothing —
      // but it needs its own message, or it reads as a transient outage and
      // nobody goes and tops the account up.
      if (err?.status === 402 || err?.type === 'billing_error') {
        console.error('BILLING: out of credit or spend limit reached');
        // `paused` tells the widget to hide itself rather than sit there
        // broken. Only for states that will not fix themselves — never for 429
        // or network blips, where hiding the widget would be the worse outcome.
        return json(
          {
            error:
              'The documentation assistant has reached its usage limit and is paused. Please use the search at the top of the page in the meantime.',
            paused: true,
          },
          503,
        );
      }
      if (err instanceof Anthropic.RateLimitError) {
        return json({ error: 'The chatbot is busy right now, please try again in a moment.' }, 429);
      }
      if (
        err instanceof Anthropic.AuthenticationError ||
        err instanceof Anthropic.PermissionDeniedError
      ) {
        // Credentials are wrong: no amount of retrying fixes it, so the widget
        // is told to hide. Wording matches that, rather than promising a
        // recovery that will not come on its own.
        return json(
          {
            error:
              'The documentation assistant is unavailable and has been paused. Please use the search at the top of the page.',
            paused: true,
          },
          503,
        );
      }
      return json({ error: 'An error occurred, please try again.' }, 500);
    }
  },
};
