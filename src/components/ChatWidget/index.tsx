import React, { useState, useRef, useEffect, useId } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import styles from './styles.module.css';
import { renderAnswer, prettifyUrl, internalPath, SourceLink, type Source } from './markdown';

// Used only if docusaurus.config.js somehow carries no chatApiUrl. Relative,
// because the backend is a Worker in this same deployment.
const FALLBACK_API_URL = 'https://docs-chatbot-beta.vercel.app/api/chat';

// How many previous turns to send so follow-ups ("and the other module?") have
// something to refer to. The backend caps this again; it is bounded here too
// so a long session does not grow the request without limit.
const HISTORY_TURNS = 4;

// A page load starts a clean chat, always.
//
// The conversation lives in React state and nowhere else. Persisting it across
// reloads was tried and rejected: coming back to the docs and finding
// yesterday`s questions still on screen reads as the page having failed to
// reset, not as a convenience — and the timestamp meant to age it out was
// refreshed by the very act of restoring it, so it never expired at all.
//
// The cost is that a reload loses a half-typed question. That is what a reload
// does to every other form on the page too, and it is the behaviour that was
// asked for.

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  // Set on real answers only, which are the only bubbles worth rating: an error
  // or the "paused" notice says nothing about how well the assistant answers.
  // Carries the question so a rating arrives with what it is a rating of.
  question?: string;
};

// A rating, per answer. `id` ties the comment that may follow to the rating
// already reported, and `ts` (when the backend stored the rating, from its
// answer) puts the comment on the same row of the dashboard table.
type Rating = {
  id: string;
  value: 'up' | 'down';
  comment: string;
  commentSent: boolean;
  ts?: number;
};

// Answers can run long; the dashboard only needs enough to recognise one. The
// backend caps it at the same length.
const FEEDBACK_ANSWER_CHARS = 4000;
const FEEDBACK_COMMENT_CHARS = 2000;

function newRatingId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    // Non-secure contexts (plain-http previews) have no randomUUID.
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

// Usage and ratings for the team's ThingsBoard dashboard: counts, plus the
// question, answer and comment of a rating for reading there. The backend holds
// the device token and decides what counts, so this just reports. text/plain
// keeps it a simple request with no CORS preflight; keepalive lets a rating sent
// as the tab closes still arrive. Fire and forget: a failure costs one rating,
// never the chat.
type UsageEvent = 'chat_opened' | 'rating_up' | 'rating_down' | 'rating_comment';
type UsageDetails = { id?: string; question?: string; answer?: string; comment?: string; ts?: number };

// Resolves to the `ts` a rating was stored at, when the backend says; never
// rejects.
async function reportEvent(
  apiUrl: string,
  event: UsageEvent,
  details: UsageDetails = {},
): Promise<number | undefined> {
  const url = apiUrl.replace(/\/api\/chat\/?$/, '/api/event');
  if (url === apiUrl) return undefined;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ event, ...details }),
      keepalive: true,
    });
    if (res.status !== 200) return undefined;
    const { ts } = await res.json();
    return typeof ts === 'number' ? ts : undefined;
  } catch {
    return undefined;
  }
}

// The backend has shipped two shapes for `sources`: a bare URL string per
// source, and an object carrying the title and site alongside the URL. The
// deployment this widget talks to still sends strings, and answers cached under
// the old shape outlive a backend that moves to the new one — so accept both
// and let everything downstream see objects. Without this a string source makes
// `primary.url` undefined and prettifyUrl() throws, taking the page with it.
function normalizeSources(sources: unknown): Source[] | undefined {
  if (!Array.isArray(sources)) return undefined;
  const out = sources.flatMap((s): Source[] => {
    if (typeof s === 'string') return s ? [{ url: s }] : [];
    if (s && typeof s === 'object' && typeof (s as Source).url === 'string') {
      return [s as Source];
    }
    return [];
  });
  return out.length ? out : undefined;
}

// Every word the widget says, per locale.
//
// Keyed by the locale Docusaurus is rendering, so the chrome matches the page
// it sits on rather than being English over a Czech page. Anything the backend
// says — the answers themselves, and its error messages — follows the language
// of the question instead, which is not always the same thing: a Czech visitor
// may well ask in English, and gets an English answer inside Czech chrome.
//
// Unknown locale falls back to English.

const UI = {
  en: {
    title: 'HARDWARIO Docs Assistant',
    beta: 'Beta v2.1',
    greeting:
      'Hello! 👋 I am the AI assistant for HARDWARIO technical documentation. ' +
      'I will help you find information about our hardware, software and cloud ' +
      'solutions quickly. What can I help you with today?',
    // Three things the corpus genuinely answers well, spread across product,
    // firmware and integration so the trio does not read as one question asked
    // three ways. Each was checked against the live backend: an opener that
    // lands on rung 2 ("which product did you mean?") is a bad opener, which is
    // what ruled out the more obvious "how do I connect to HARDWARIO Cloud?".
    suggestions: [
      'What is the CHESTER platform?',
      'How to flash firmware to CHESTER or STICKER?',
      'How to get started with HARDWARIO Cloud?',
    ],
    placeholder: 'Type your question…',
    searching: 'Searching the documentation',
    newChat: 'New conversation',
    expand: 'Expand the chat',
    shrink: 'Shrink the chat',
    close: 'Close the chat',
    launch: 'Ask about the documentation',
    rateUp: 'Helpful',
    rateDown: 'Not helpful',
    rateThanks: 'Thanks for the feedback!',
    copyCode: 'Copy',
    copiedCode: 'Copied',
    rateComment: 'What was wrong? (optional)',
    rateCommentSend: 'Send',
    // The comment is stored with the question and the answer, for the team.
    rateCommentHint: 'Do not include personal data.',
    teaser: '👋 Hi! Stuck on something? Ask me anything about HARDWARIO devices.',
    teaserClose: 'Hide this message',
    launchClose: 'Close the documentation assistant',
    hideSources: 'Hide the other pages',
    morePages: (n: number) => `${n} more page${n > 1 ? 's' : ''}`,
    moreSources: (n: number) => `${n} more source${n > 1 ? 's' : ''}`,
    failed: 'Something went wrong, please try again.',
    unreachable: 'Could not reach the server. Please try again.',
    paused:
      'The documentation assistant ran into an error and is unavailable. Please use the ' +
      'search at the top of the page, or write to ask@hardwario.com.',
    sites: { docs: 'Documentation', www: 'hardwario.com', store: 'Store' },
    // Under the input: where a question goes, and the privacy policy in the
    // reader's language.
    privacy: 'Your questions are sent to an external AI service to generate the answer. Privacy:',
    privacyUrl: 'https://www.hardwario.com/legal/privacy/',
  },
  cs: {
    title: 'HARDWARIO Docs Assistant',
    beta: 'Beta v2.1',
    greeting:
      'Dobrý den! 👋 Jsem AI asistent technické dokumentace HARDWARIO. ' +
      'Rychle vám pomůžu najít informace o našem hardwaru, softwaru ' +
      'a cloudových řešeních. S čím vám dnes mohu pomoci?',
    suggestions: [
      'Co je platforma CHESTER?',
      'Jak nahrát firmware do zařízení CHESTER nebo STICKER?',
      'Jak začít používat HARDWARIO Cloud?',
    ],
    placeholder: 'Napište svůj dotaz…',
    searching: 'Hledám v dokumentaci',
    newChat: 'Nová konverzace',
    expand: 'Zvětšit chat',
    shrink: 'Zmenšit chat',
    close: 'Zavřít chat',
    launch: 'Zeptejte se na dokumentaci',
    rateUp: 'Užitečné',
    rateDown: 'Neužitečné',
    rateThanks: 'Děkujeme za zpětnou vazbu!',
    copyCode: 'Kopírovat',
    copiedCode: 'Zkopírováno',
    rateComment: 'Co bylo špatně? (nepovinné)',
    rateCommentSend: 'Odeslat',
    rateCommentHint: 'Neuvádějte osobní údaje.',
    teaser: '👋 Dobrý den! Potřebujete poradit? Zeptejte se mě na cokoli o zařízeních HARDWARIO.',
    teaserClose: 'Skrýt tuto zprávu',
    launchClose: 'Zavřít asistenta dokumentace',
    hideSources: 'Skrýt ostatní stránky',
    // 2–4 "stránky", 5+ "stránek" — Czech does not pluralise the way a
    // count + "s" does, and "1 stránky" would be wrong in a way English never is.
    morePages: (n: number) => `${n === 1 ? '1 další stránka' : n < 5 ? `${n} další stránky` : `${n} dalších stránek`}`,
    moreSources: (n: number) => `${n === 1 ? '1 další zdroj' : n < 5 ? `${n} další zdroje` : `${n} dalších zdrojů`}`,
    failed: 'Něco se pokazilo, zkuste to prosím znovu.',
    unreachable: 'Nepodařilo se spojit se serverem. Zkuste to prosím znovu.',
    paused:
      'Asistent dokumentace narazil na chybu a není dostupný. Použijte prosím hledání ' +
      'v horní části stránky, nebo nám napište na ask@hardwario.com.',
    sites: { docs: 'Dokumentace', www: 'hardwario.com', store: 'E-shop' },
    privacy:
      'Vaše dotazy se odesílají externí službě umělé inteligence, která generuje odpověď. ' +
      'Ochrana osobních údajů:',
    privacyUrl: 'https://www.hardwario.com/cs/legal/privacy/',
  },
} as const;

type UiText = (typeof UI)['en'];

function textFor(locale: string): UiText {
  return (UI as Record<string, UiText>)[locale] ?? UI.en;
}

// Must match the transition on .panel in the stylesheet. Too short and the
// element vanishes mid-animation; too long and the launcher sits over a panel
// nobody can see any more.
const PANEL_EXIT_MS = 180;

// The speech bubble beside the launcher waits this long, so it arrives after
// the page has settled rather than as part of the page loading, and once dismissed
// it stays dismissed for the rest of the visit. Dismissing is either its ✕ or
// opening the chat: either way the visitor has found the assistant, and saying
// hello again on every page is nagging. Session storage, not local: a returning
// visitor gets greeted again, rather than never seeing the bubble after the
// first time they touched the chat.
const TEASER_DELAY_MS = 2500;
const TEASER_DISMISSED_KEY = 'hwio-chat-teaser-dismissed';

// Storage can throw outright (blocked site data, some private windows), and a
// greeting is not worth an error. Unreadable counts as not dismissed;
// unwritable means it may show again on the next page, which is harmless.
function teaserDismissed(): boolean {
  try {
    return sessionStorage.getItem(TEASER_DISMISSED_KEY) === '1';
  } catch {
    return false;
  }
}

function dismissTeaser() {
  try {
    sessionStorage.setItem(TEASER_DISMISSED_KEY, '1');
  } catch {
    // See teaserDismissed().
  }
}

function exitDelay() {
  try {
    // With motion switched off there is no animation to wait for, and waiting
    // would just be a delay before the panel disappears.
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : PANEL_EXIT_MS;
  } catch {
    return PANEL_EXIT_MS;
  }
}

// A circular arrow: start over. Drawn on a 24 viewBox rather than ResizeIcon's
// 16 because the arc and its arrowhead need the room; strokeWidth is scaled by
// the same 24/16 so the two weigh the same in the header, where any difference
// between neighbours shows.
function NewChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <polyline points="22.5 4 22.5 9.5 17 9.5" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L22.5 9.5" />
    </svg>
  );
}

// Arrows out of the corners, or back into them. One component so the two states
// cannot drift apart in stroke weight or size.
function ResizeIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {expanded ? (
        <>
          <path d="M13.5 6.5H9.5V2.5" />
          <path d="M2.5 9.5H6.5V13.5" />
          <path d="M14 2L9.5 6.5" />
          <path d="M2 14L6.5 9.5" />
        </>
      ) : (
        <>
          <path d="M9.5 2.5H13.5V6.5" />
          <path d="M6.5 13.5H2.5V9.5" />
          <path d="M13.5 2.5L9 7" />
          <path d="M2.5 13.5L7 9" />
        </>
      )}
    </svg>
  );
}

// The assistant: a small robot in the HARDWARIO palette, free-standing rather
// than inside a button shape, so it reads as a chatbot at a glance. The antenna
// and the chest light are red nodes like the ones in the circuit mark. Inline
// rather than an <img> so CSS can reach its parts:
//   intro  on the page load it floats up, opens its eyes and waves;
//   idle   it hovers gently over its shadow, blinks now and then, the antenna
//          sends a signal ring and the chest light breathes;
//   hover  (launcher) it tilts its head, smiles and waves;
//   busy   while an answer is being looked up, its eyes scan side to side and
//          the antenna signals continuously.
// Colours come from the stylesheet and follow the page theme. `head` frames
// just the head, for the panel header.
function RobotMark({
  className,
  intro,
  busy,
  head,
}: {
  className?: string;
  intro?: boolean;
  busy?: boolean;
  head?: boolean;
}) {
  const svgClass = [className, styles.robot, intro && styles.robotIntro, busy && styles.robotBusy]
    .filter(Boolean)
    .join(' ');
  return (
    <svg className={svgClass} viewBox={head ? '2 0 44 37' : '0 0 48 64'} aria-hidden="true" focusable="false">
      {!head && <ellipse className={styles.robotShadow} cx="24" cy="60.5" rx="10" ry="2.2" />}
      <g className={styles.robotFloat}>
        {!head && (
          <g>
            <g className={styles.robotArmLeft}>
              <rect className={styles.robotShell} x="8" y="38.5" width="5" height="11" rx="2.5" />
            </g>
            <g className={styles.robotArmRight}>
              <rect className={styles.robotShell} x="35" y="38.5" width="5" height="11" rx="2.5" />
            </g>
            <rect className={styles.robotInk} x="21" y="33.5" width="6" height="4" rx="1" />
            <rect className={styles.robotShell} x="13" y="36.5" width="22" height="16" rx="6.5" />
            <circle className={styles.robotChest} cx="24" cy="44.5" r="2.4" />
          </g>
        )}
        <g className={styles.robotHead}>
          <circle className={styles.robotSignal} cx="24" cy="5" r="2.6" />
          <path className={styles.robotLine} d="M24 7.6V10.5" />
          <circle className={styles.robotNode} cx="24" cy="5" r="2.6" />
          <rect className={styles.robotInk} x="4.2" y="17" width="3.4" height="8.5" rx="1.7" />
          <rect className={styles.robotInk} x="40.4" y="17" width="3.4" height="8.5" rx="1.7" />
          <rect className={styles.robotShell} x="7.5" y="10.5" width="33" height="24" rx="8" />
          <rect className={styles.robotVisor} x="11.5" y="15.3" width="25" height="14.2" rx="5.5" />
          <g className={styles.robotEyes}>
            <rect className={styles.robotEye} x="17" y="19.2" width="3.8" height="6.2" rx="1.9" />
            <rect className={styles.robotEye} x="27.2" y="19.2" width="3.8" height="6.2" rx="1.9" />
          </g>
        </g>
      </g>
    </svg>
  );
}

// The 👍 / 👎 row under an answer. Before rating: both thumbs. After 👍: thanks.
// After 👎: thanks plus an optional box for what went wrong, since a 👎 alone
// says that an answer failed but not how.
function Feedback({
  rating,
  t,
  onRate,
  onComment,
  onSend,
}: {
  rating?: Rating;
  t: UiText;
  onRate: (value: Rating['value']) => void;
  onComment: (comment: string) => void;
  onSend: () => void;
}) {
  const hintId = useId();
  if (!rating) {
    return (
      <div className={styles.feedback}>
        <button
          type="button"
          className={styles.feedbackBtn}
          onClick={() => onRate('up')}
          title={t.rateUp}
          aria-label={t.rateUp}
        >
          👍
        </button>
        <button
          type="button"
          className={styles.feedbackBtn}
          onClick={() => onRate('down')}
          title={t.rateDown}
          aria-label={t.rateDown}
        >
          👎
        </button>
      </div>
    );
  }

  return (
    <div className={styles.feedback}>
      <span className={styles.feedbackThanks}>
        {rating.value === 'up' ? '👍' : '👎'} {t.rateThanks}
      </span>
      {rating.value === 'down' && !rating.commentSent && (
        <form
          className={styles.feedbackComment}
          onSubmit={e => {
            e.preventDefault();
            onSend();
          }}
        >
          <input
            type="text"
            value={rating.comment}
            onChange={e => onComment(e.target.value)}
            placeholder={t.rateComment}
            aria-label={t.rateComment}
            aria-describedby={hintId}
            maxLength={2000}
          />
          <button type="submit" disabled={!rating.comment.trim()}>
            {t.rateCommentSend}
          </button>
        </form>
      )}
      {rating.value === 'down' && !rating.commentSent && (
        <span id={hintId} className={styles.feedbackHint}>
          {t.rateCommentHint}
        </span>
      )}
    </div>
  );
}

export default function ChatWidget() {
  const { siteConfig, i18n } = useDocusaurusContext();
  // The chrome speaks the language of the page it is sitting on.
  const t = textFor(i18n.currentLocale);
  const apiUrl = (siteConfig.customFields?.chatApiUrl as string) || FALLBACK_API_URL;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  // Kept across close and reopen: how big someone wants the panel is a
  // preference, not part of the conversation that closing throws away.
  const [expanded, setExpanded] = useState(false);
  // See the effect below: `mounted` is DOM presence, `shown` is the open class.
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  // Which answers have their extra sources unfolded, by message index.
  const [showAllSources, setShowAllSources] = useState<Record<number, boolean>>({});
  const [teaser, setTeaser] = useState(false);
  // The robot's entrance (floating up, waking, waving) is for the
  // page load only. Closing the chat remounts the robot, and replaying the
  // entrance every time would make the button flicker in and out.
  const [intro, setIntro] = useState(true);
  // Ratings by message index, cleared with the conversation they belong to.
  const [ratings, setRatings] = useState<Record<number, Rating>>({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastMsgRef = useRef<HTMLDivElement>(null);
  const privacyId = useId();

  // Closing ends the conversation. Reopening starts a new one, rather than
  // resuming a thread the visitor already decided they were finished with —
  // and the backend is only sent the turns still on screen, so a fresh panel is
  // a fresh context there too. The clearing happens in the effect below, once
  // the panel is out of sight: doing it here would empty the chat in front of
  // the visitor while it was still animating away.
  function close() {
    setOpen(false);
  }

  function closeTeaser() {
    setTeaser(false);
    dismissTeaser();
  }

  // Read after mount, not during render: the server-rendered page has no
  // storage, and the two renders have to agree.
  useEffect(() => {
    if (open) {
      reportEvent(apiUrl, 'chat_opened');
      setIntro(false);
      if (teaser) closeTeaser();
      return;
    }
    if (teaserDismissed()) return;
    const timer = window.setTimeout(() => setTeaser(true), TEASER_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  // Same clearing that closing performs, minus the closing. `loading` is left
  // alone on purpose: the button is disabled while a request is in flight, so
  // there is no way to reach this mid-answer and strand the spinner.
  function newChat() {
    setMessages([]);
    setInput('');
    setShowAllSources({});
    setRatings({});
  }

  // One click rates, and the thumbs are replaced by a thank-you, so an answer
  // is rated once.
  function rate(i: number, value: Rating['value']) {
    const m = messages[i];
    if (ratings[i] || !m) return;
    const id = newRatingId();
    setRatings(r => ({ ...r, [i]: { id, value, comment: '', commentSent: false } }));
    reportEvent(apiUrl, value === 'up' ? 'rating_up' : 'rating_down', {
      id,
      question: m.question ?? '',
      answer: m.content.slice(0, FEEDBACK_ANSWER_CHARS),
    }).then(ts => {
      // Matched by id: by now the conversation may have been cleared.
      if (ts) setRatings(rs => (rs[i]?.id === id ? { ...rs, [i]: { ...rs[i], ts } } : rs));
    });
  }

  function sendComment(i: number) {
    const r = ratings[i];
    const comment = r?.comment.trim();
    if (!r || !comment || r.commentSent) return;
    setRatings(rs => ({ ...rs, [i]: { ...r, commentSent: true } }));
    reportEvent(apiUrl, 'rating_comment', {
      id: r.id,
      comment: comment.slice(0, FEEDBACK_COMMENT_CHARS),
      ts: r.ts,
    });
  }

  // Two flags, because an element cannot animate out of the DOM. `mounted` is
  // whether the panel exists; `shown` is whether it carries the open class that
  // the transition targets. Opening sets both, a frame apart so the browser has
  // a closed state to move from; closing drops `shown` first and only removes
  // the element once the transition has had time to run.
  useEffect(() => {
    if (open) {
      setMounted(true);
      // Two frames, not one. React flushes the mount before the browser paints,
      // and a single rAF callback still runs before that same paint — so both
      // the closed and the open state land in one frame, the transition has
      // nothing to move from, and the panel simply appears. Arming the class a
      // frame after the first paint is what makes opening animate. Closing
      // never needed this: by then the panel has been on screen for a while.
      let second = 0;
      const first = requestAnimationFrame(() => {
        second = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(first);
        cancelAnimationFrame(second);
      };
    }

    setShown(false);
    const timer = window.setTimeout(() => {
      setMounted(false);
      setMessages([]);
      setInput('');
      setShowAllSources({});
      setRatings({});
    }, exitDelay());
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const last = messages[messages.length - 1];

    // An answer is read from its first line down. Scrolling to the bottom of it
    // — which is what following the end of the list does — drops the reader at
    // the last line of something they have not started, and they have to scroll
    // back up to begin. So the top of a new answer goes to the top of the view
    // instead, and only the visitor's own message and the "looking it up" line
    // follow the bottom, because there the newest line *is* the thing to see.
    if (last?.role === 'assistant' && !loading && listRef.current && lastMsgRef.current) {
      const list = listRef.current.getBoundingClientRect();
      const msg = lastMsgRef.current.getBoundingClientRect();
      // Relative, not scrollIntoView: this scrolls the panel only, and never
      // moves the documentation page behind it.
      listRef.current.scrollBy({ top: msg.top - list.top, behavior: 'smooth' });
      return;
    }

    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // `text` is how an opener sends itself; typing still goes through `input`.
  async function send(text?: string) {
    const query = (text ?? input).trim();
    if (!query || loading) return;

    // Snapshot before appending: the new question travels as `query`, so
    // including it in `history` too would send it twice.
    const history = messages
      .slice(-HISTORY_TURNS)
      .map(({ role, content }) => ({ role, content }));

    setMessages(m => [...m, { role: 'user', content: query }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, history }),
      });
      const data = await res.json();

      // Backend is out of credit or misconfigured. The widget stays: this
      // bubble is what routes people to the support address, and hiding it
      // after one question meant almost nobody ever read it. A button that
      // answers "write to us" is worth more than no button at all.
      if (data.paused) {
        setMessages(m => [...m, {
          role: 'assistant',
          // Not data.error: the backend answers in one language (English) and
          // this bubble is chrome, so it follows the page like the rest of it.
          // Both say the same thing and name the same address.
          content: t.paused,
        }]);
        return;
      }

      setMessages(m => [...m, {
        role: 'assistant',
        content: data.answer || data.error || t.failed,
        sources: normalizeSources(data.sources),
        question: data.answer ? query : undefined,
      }]);
    } catch {
      setMessages(m => [...m, {
        role: 'assistant',
        content: t.unreachable,
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className={styles.wrapper}>
      {mounted && (
        <div
          className={[
            styles.panel,
            shown && styles.panelOpen,
            expanded && styles.panelExpanded,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              {/* The same robot as the launcher button, so the panel is visibly
                  the thing that was just clicked. Its eyes scan while an
                  answer is being looked up. Decorative: the title beside it
                  already names it. */}
              <span className={styles.headerAvatar}>
                <RobotMark className={styles.headerIcon} busy={loading} head />
              </span>
              <div className={styles.headerText}>
                <span className={styles.headerTitle}>{t.title}</span>
                <span className={styles.headerBeta}>{t.beta}</span>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button
                type="button"
                className={styles.newChat}
                onClick={newChat}
                disabled={loading || messages.length === 0}
                title={t.newChat}
                aria-label={t.newChat}
              >
                <NewChatIcon />
              </button>
              {/* Drawn rather than typed: ⤢ and ⤡ are missing from enough system
                  fonts to show as a blank box, and this sits next to the ✕ where
                  that would be obvious. */}
              <button
                type="button"
                className={styles.expand}
                onClick={() => setExpanded(e => !e)}
                aria-expanded={expanded}
                title={expanded ? t.shrink : t.expand}
                aria-label={expanded ? t.shrink : t.expand}
              >
                <ResizeIcon expanded={expanded} />
              </button>
              <button className={styles.close} onClick={close} title={t.close}>
                ✕
              </button>
            </div>
          </div>

          <div className={styles.messages} ref={listRef}>
            {/* A greeting in the assistant's own bubble rather than a grey note
                in the middle of the panel — it is a message, so it looks like
                one, and the first real answer lands in the same shape right
                below it.

                Render-only: it never enters `messages`, so it is not replayed
                to the model as conversation history and costs nothing. */}
            {messages.length === 0 && (
              <div className={`${styles.botMsg} ${styles.greetingEnter}`}>
                <p>{t.greeting}</p>
              </div>
            )}
            {/* Openers, on an empty chat only: three questions this assistant
                answers well, so nobody has to guess what it knows. Right under
                the greeting they answer, not parked by the input with a blank
                gap between the two. They go as soon as the conversation starts:
                by then the visitor has their own question and these would only
                be in the way. */}
            {messages.length === 0 && (
              <div className={styles.suggestions}>
                {t.suggestions.map(q => (
                  <button
                    key={q}
                    type="button"
                    className={styles.suggestion}
                    onClick={() => send(q)}
                    disabled={loading}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => {
              const [primary, ...rest] = m.sources ?? [];
              const isLast = i === messages.length - 1;
              return (
                <div
                  key={i}
                  ref={isLast ? lastMsgRef : undefined}
                  className={m.role === 'user' ? styles.userMsg : styles.botMsg}
                >
                  {/* The visitor's own words are shown exactly as typed; only
                      answers are Markdown. */}
                  {m.role === 'user' ? (
                    <p>{m.content}</p>
                  ) : (
                    <div className={styles.answer}>
                      {/* A rendering bug must cost the formatting of one
                          answer, never the documentation page around it. */}
                      <ErrorBoundary fallback={() => <p>{m.content}</p>}>
                        <>{renderAnswer(m.content, m.sources, { copy: t.copyCode, copied: t.copiedCode })}</>
                      </ErrorBoundary>
                    </div>
                  )}
                  {primary && (
                    <div className={styles.sources}>
                      {/* One page is what a reader wants after an answer. The
                          rest of what retrieval turned up is real but secondary,
                          so it folds behind the ellipsis rather than competing
                          with the page the answer was actually written from. */}
                      <div className={styles.sourceRow}>
                        <SourceLink url={primary.url} className={styles.sourcePrimary}>
                          {primary.site && primary.site !== 'docs' && t.sites[primary.site] && (
                            <span className={styles.sourceChipSite}>{t.sites[primary.site]}</span>
                          )}
                          <span className={styles.sourcePrimaryTitle}>
                            {(primary.title || prettifyUrl(primary.url)).replace(
                              /\s*\|\s*HARDWARIO.*$/i,
                              '',
                            )}
                          </span>
                          {/* An arrow only where one is earned: off-site links
                              open a tab, documentation links navigate in place. */}
                          <span className={styles.sourcePrimaryArrow} aria-hidden="true">
                            {internalPath(primary.url) ? '→' : '↗'}
                          </span>
                        </SourceLink>

                        {rest.length > 0 && (
                          <button
                            type="button"
                            className={styles.sourceMore}
                            onClick={() =>
                              setShowAllSources(s => ({ ...s, [i]: !s[i] }))
                            }
                            aria-expanded={!!showAllSources[i]}
                            title={
                              showAllSources[i]
                                ? t.hideSources
                                : t.morePages(rest.length)
                            }
                            aria-label={t.moreSources(rest.length)}
                          >
                            ⋯
                          </button>
                        )}
                      </div>

                      {showAllSources[i] && (
                        <div className={styles.sourceChips}>
                          {rest.map(s => (
                            <SourceLink key={s.url} url={s.url} className={styles.sourceChip}>
                              {s.site && s.site !== 'docs' && t.sites[s.site] && (
                                <span className={styles.sourceChipSite}>{t.sites[s.site]}</span>
                              )}
                              <span className={styles.sourceChipTitle}>
                                {(s.title || prettifyUrl(s.url)).replace(/\s*\|\s*HARDWARIO.*$/i, '')}
                              </span>
                              <span className={styles.sourceChipArrow} aria-hidden="true">
                                {internalPath(s.url) ? '→' : '↗'}
                              </span>
                            </SourceLink>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {m.role === 'assistant' && m.question && (
                    <Feedback
                      rating={ratings[i]}
                      t={t}
                      onRate={value => rate(i, value)}
                      onComment={comment =>
                        setRatings(rs => ({ ...rs, [i]: { ...rs[i], comment } }))
                      }
                      onSend={() => sendComment(i)}
                    />
                  )}
                </div>
              );
            })}
            {loading && (
              <div className={styles.botMsg}>
                {/* The dots are decorative; the label is what a screen reader
                    announces, and role="status" makes it announce the arrival
                    of the answer without stealing focus. */}
                <span className={styles.typing} role="status" aria-label={t.searching}>
                  <span className={styles.typingDot} aria-hidden="true" />
                  <span className={styles.typingDot} aria-hidden="true" />
                  <span className={styles.typingDot} aria-hidden="true" />
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>


          <div className={styles.inputRow}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t.placeholder}
              disabled={loading}
              maxLength={500}
              aria-describedby={privacyId}
            />
            <button onClick={() => send()} disabled={loading || !input.trim()}>
              ➤
            </button>
          </div>
          <p id={privacyId} className={styles.privacy}>
            {t.privacy}{' '}
            <a href={t.privacyUrl} target="_blank" rel="noopener noreferrer">
              {t.privacyUrl.replace(/^https:\/\//, '')}
            </a>
          </p>
        </div>
      )}

      {teaser && !open && (
        <div className={styles.teaser}>
          {/* The message is itself a way in: clicking it opens the chat, as
              the button it points at would. */}
          <button type="button" className={styles.teaserText} onClick={() => setOpen(true)}>
            {t.teaser}
          </button>
          <button
            type="button"
            className={styles.teaserClose}
            onClick={closeTeaser}
            title={t.teaserClose}
            aria-label={t.teaserClose}
          >
            ✕
          </button>
        </div>
      )}

      {/* Shows ✕ while the panel is open, so it is the same gesture as the one
          in the header and has to do the same thing — end the conversation. */}
      <button
        className={[styles.fab, open && styles.fabOpen].filter(Boolean).join(' ')}
        onClick={() => (open ? close() : setOpen(true))}
        title={t.launch}
        aria-label={open ? t.launchClose : t.launch}
      >
        {open ? (
          <span className={styles.fabX} aria-hidden="true">✕</span>
        ) : (
          <RobotMark className={styles.fabIcon} intro={intro} />
        )}
      </button>
    </div>
  );
}
