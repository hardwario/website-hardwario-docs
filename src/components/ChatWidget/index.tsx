import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// Used only if docusaurus.config.js somehow carries no chatApiUrl. Relative,
// because the backend is a Worker in this same deployment.
const FALLBACK_API_URL = 'https://docs-chatbot-beta.vercel.app/api/chat';

// How many previous turns to send so follow-ups ("and the other module?") have
// something to refer to. The backend caps this again; it is bounded here too
// so a long session does not grow the request without limit.
const HISTORY_TURNS = 4;

// When the backend reports it is paused (out of credit, or bad credentials), hide
// the widget entirely instead of leaving a button that only produces errors.
// Remembered per visitor so only the unlucky first one ever sees the message.
const PAUSED_KEY = 'hardwario-docs-chat-paused-until';
// Expires so the widget comes back on its own once the account is topped up —
// nobody has to remember to clear anything.
const PAUSED_FOR_MS = 6 * 60 * 60 * 1000;

function readPaused(): boolean {
  try {
    const until = Number(window.localStorage.getItem(PAUSED_KEY));
    return Number.isFinite(until) && until > Date.now();
  } catch {
    return false; // private mode / storage disabled — just show the widget
  }
}

function markPaused() {
  try {
    window.localStorage.setItem(PAUSED_KEY, String(Date.now() + PAUSED_FOR_MS));
  } catch {
    /* ignore — hiding for this page view still works via state */
  }
}

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

// The backend now names each source rather than returning a bare URL, so the
// list can read as page titles instead of paths.
type Source = {
  url: string;
  title?: string;
  site?: 'docs' | 'www' | 'store';
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
};

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

// The backend writes bare URLs and no Markdown, because this bubble renders
// plain text — a Markdown link would show up as literal brackets. Bare URLs are
// not clickable on their own either, and a raw path is ugly to read, so they are
// turned into links titled with the page name here.
//
// The names come from `sources`, which the backend already sends for the same
// passages the answer was written from. So the model never has to produce link
// markup, and cannot get the title wrong.
//
// Splitting on a regex and rendering real elements keeps this injection-proof:
// nothing the model wrote is ever interpreted as markup.
const URL_IN_TEXT = /(https?:\/\/[^\s<>()[\]]+[^\s<>()[\].,;:!?])/g;

// Last resort for a URL that is not among the sources: "…/sim-card-setup"
// becomes "sim card setup", which still beats showing the whole path.
function prettifyUrl(url: string) {
  const path = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/+$/, '');
  const segments = path.split('/');
  // ".../apps/thingsboard/index" is the ThingsBoard page, not a page called
  // "index" — the segment that names it is the directory above.
  if (segments.length > 1 && segments[segments.length - 1] === 'index') segments.pop();
  const last = segments.pop() || path;
  return last.replace(/[-_]+/g, ' ') || path;
}

// A documentation URL is a page of the site this widget is already on, so it
// should navigate rather than spawn a tab. Returns the path to route to, or
// null for anything off-site.
const DOCS_ORIGIN = 'https://docs.hardwario.com';

function internalPath(url: string): string | null {
  if (!url.startsWith(`${DOCS_ORIGIN}/`) && url !== DOCS_ORIGIN) return null;
  return url.slice(DOCS_ORIGIN.length) || '/';
}

// The widget is mounted in theme/Root, so it survives client-side navigation:
// following a source changes the page underneath while the conversation stays
// open. A plain <a> would reload the document and lose it, so documentation
// links go through Docusaurus's router. Store and website links are a different
// site and keep opening in a new tab, so leaving the docs is deliberate.
function SourceLink({
  url,
  className,
  children,
}: {
  url: string;
  className?: string;
  children: React.ReactNode;
}) {
  const path = internalPath(url);
  if (path) {
    return (
      <Link className={className} to={path} title={path}>
        {children}
      </Link>
    );
  }
  return (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer" title={url}>
      {children}
    </a>
  );
}

// The prompt asks for no Markdown, and the model writes **bold** and "# heading"
// anyway — often enough that asking harder is not a fix. Handling it here costs
// less than the literal asterisks and hashes a reader would otherwise see.
// Emphasis is rendered, heading markers are simply dropped: the bubble is too
// small for a heading to mean anything, but the line it marks is still wanted.
// Nothing is ever parsed as HTML.
// Bold cannot cross a line break. Without that, one unclosed ** swallows the
// rest of the answer: asked where the newest CHESTER firmware is, the model
// opened bold on "HARDWARIO Manager" and closed it four lines later on "FOTA",
// and everything between them — three bullets — rendered as one bold run with
// the list markup buried inside it.
const BOLD = /\*\*([^*\n]+)\*\*/g;
const HEADING_MARKER = /^[ \t]*#{1,6}[ \t]+/gm;
// Whatever asterisks are left once the balanced pairs are gone: an opener with
// no closer, which would otherwise show up as literal ** in the bubble.
const STRAY_ASTERISKS = /\*+/g;

function stripMarkup(text: string) {
  return text.replace(HEADING_MARKER, '');
}

function emphasize(text: string, keyPrefix: string) {
  return text.split(BOLD).map((part, i) =>
    // The capturing group puts bold runs at the odd indices, same trick as
    // below — and same reason to derive it from position rather than re-test a
    // /g regex, whose lastIndex makes .test() alternate.
    i % 2 === 1 ? (
      <strong key={`${keyPrefix}b${i}`}>{part}</strong>
    ) : (
      part.replace(STRAY_ASTERISKS, '')
    ),
  );
}

// [Common Functionality](https://docs.hardwario.com/...) — the backend now asks
// the model for these, and adds them itself for page names the model wrote
// without one, so a page the answer mentions is a page the reader can open from
// where it is mentioned. Two capturing groups, so split() interleaves in threes.
//
// Rendering the label as a React element, never as HTML, is what keeps this
// injection-proof: bracket text is text whatever it contains.
const MD_LINK = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g;

function bareUrls(text: string, keyPrefix: string, titleByUrl: Map<string, string>) {
  // split() with one capturing group interleaves the parts: text, url, text,
  // url... so the odd indices are the matches. Deriving it from the position
  // avoids calling .test() on a /g regex, which is stateful through lastIndex
  // and would return true and false alternately for the same string.
  return text.split(URL_IN_TEXT).map((part, i) => {
    if (i % 2 === 0) return emphasize(part, `${keyPrefix}t${i}`);
    const title = titleByUrl.get(part.replace(/\/+$/, ''));
    return (
      <SourceLink key={`${keyPrefix}u${i}`} url={part}>
        {(title || prettifyUrl(part)).replace(/\s*\|\s*HARDWARIO.*$/i, '')}
      </SourceLink>
    );
  });
}

function linkify(text: string, sources: Source[] = []) {
  const titleByUrl = new Map(
    sources.filter((s) => s.title).map((s) => [s.url.replace(/\/+$/, ''), s.title as string]),
  );

  // Markdown links first, so the URL inside one is never also matched as a bare
  // URL. Two capturing groups means the parts run text, label, url, text,
  // label, url... — the label at 3n+1 and its URL at 3n+2.
  const parts = stripMarkup(text).split(MD_LINK);

  return parts.map((part, i) => {
    if (i % 3 === 0) return bareUrls(part, `p${i}`, titleByUrl);
    if (i % 3 === 2) return null; // the URL — already rendered by its label
    return (
      <SourceLink key={`m${i}`} url={parts[i + 1]}>
        {part}
      </SourceLink>
    );
  });
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
    beta: 'Beta v2.0',
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
      'What is CHESTER platform?',
      'How to flash firmware to CHESTER or STICKER?',
      'How to get started with HARDWARIO Cloud?',
    ],
    placeholder: 'Type your question…',
    searching: 'Searching the documentation',
    newChat: 'New Conversation',
    expand: 'Expand the chat',
    shrink: 'Shrink the chat',
    close: 'Close the chat',
    launch: 'Ask about the documentation',
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
  },
  cs: {
    title: 'HARDWARIO Docs Assistant',
    beta: 'Beta v2.0',
    greeting:
      'Dobrý den! 👋 Jsem AI asistent technické dokumentace HARDWARIO. ' +
      'Rychle vám pomůžu najít informace o našem hardwaru, softwaru ' +
      'a cloudových řešeních. S čím vám dnes mohu pomoci?',
    suggestions: [
      'Co je platforma CHESTER?',
      'Jak nahrát firmware do CHESTERu nebo STICKERu?',
      'Jak začít používat HARDWARIO Cloud?',
    ],
    placeholder: 'Napište svůj dotaz…',
    searching: 'Hledám v dokumentaci',
    newChat: 'Nová konverzace',
    expand: 'Zvětšit chat',
    shrink: 'Zmenšit chat',
    close: 'Zavřít chat',
    launch: 'Zeptejte se na dokumentaci',
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

export default function ChatWidget() {
  const { siteConfig, i18n } = useDocusaurusContext();
  // The chrome speaks the language of the page it is sitting on.
  const t = textFor(i18n.currentLocale);
  const apiUrl = (siteConfig.customFields?.chatApiUrl as string) || FALLBACK_API_URL;
  // Hooks must run unconditionally, so resolve this here rather than inside the
  // button's open/closed ternary below.
  const iconUrl = useBaseUrl('img/hardwario-mark-white.svg');

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  // null = not checked yet. Stays null through the server render and the first
  // client render, so prerendered HTML and hydration agree and the button never
  // flashes up only to disappear.
  const [paused, setPaused] = useState<boolean | null>(null);
  // Kept across close and reopen: how big someone wants the panel is a
  // preference, not part of the conversation that closing throws away.
  const [expanded, setExpanded] = useState(false);
  // See the effect below: `mounted` is DOM presence, `shown` is the open class.
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  // Which answers have their extra sources unfolded, by message index.
  const [showAllSources, setShowAllSources] = useState<Record<number, boolean>>({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastMsgRef = useRef<HTMLDivElement>(null);

  // Client only: reading storage during render would make the prerendered HTML
  // and the first client render disagree.
  useEffect(() => {
    setPaused(readPaused());
  }, []);

  // Closing ends the conversation. Reopening starts a new one, rather than
  // resuming a thread the visitor already decided they were finished with —
  // and the backend is only sent the turns still on screen, so a fresh panel is
  // a fresh context there too. The clearing happens in the effect below, once
  // the panel is out of sight: doing it here would empty the chat in front of
  // the visitor while it was still animating away.
  function close() {
    setOpen(false);
  }

  // Same clearing that closing performs, minus the closing. `loading` is left
  // alone on purpose: the button is disabled while a request is in flight, so
  // there is no way to reach this mid-answer and strand the spinner.
  function newChat() {
    setMessages([]);
    setInput('');
    setShowAllSources({});
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

      // Backend is out of credit or misconfigured: show this one message, then
      // take the widget away rather than leave a button that cannot work.
      if (data.paused) {
        markPaused();
        setMessages(m => [...m, {
          role: 'assistant',
          // Not data.error: the backend answers in one language (English) and
          // this bubble is chrome, so it follows the page like the rest of it.
          // Both say the same thing and name the same address.
          content: t.paused,
        }]);
        // Leave the message on screen long enough to read before it vanishes.
        // `finally` below clears the loading state.
        window.setTimeout(() => setPaused(true), 6000);
        return;
      }

      setMessages(m => [...m, {
        role: 'assistant',
        content: data.answer || data.error || t.failed,
        sources: normalizeSources(data.sources),
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

  // null = still checking storage, true = paused. Render nothing either way, so
  // there is no icon at all rather than one that leads to an error.
  if (paused !== false) return null;

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
              {/* The same mark as the launcher button, so the panel is visibly
                  the thing that was just clicked. Decorative: the title beside
                  it already names it, and a screen reader saying "HARDWARIO"
                  twice helps nobody. */}
              <img className={styles.headerIcon} src={iconUrl} alt="" />
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
            {messages.map((m, i) => {
              const [primary, ...rest] = m.sources ?? [];
              const isLast = i === messages.length - 1;
              return (
                <div
                  key={i}
                  ref={isLast ? lastMsgRef : undefined}
                  className={m.role === 'user' ? styles.userMsg : styles.botMsg}
                >
                  <p>{linkify(m.content, m.sources)}</p>
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

          {/* Openers, on an empty chat only: three questions this assistant
              answers well, so nobody has to guess what it knows. They go as
              soon as the conversation starts — by then the visitor has their
              own question and these would only be in the way. */}
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

          <div className={styles.inputRow}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t.placeholder}
              disabled={loading}
              maxLength={500}
            />
            <button onClick={() => send()} disabled={loading || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Shows ✕ while the panel is open, so it is the same gesture as the one
          in the header and has to do the same thing — end the conversation. */}
      <button
        className={styles.fab}
        onClick={() => (open ? close() : setOpen(true))}
        title={t.launch}
        aria-label={open ? t.launchClose : t.launch}
      >
        {open ? (
          '✕'
        ) : (
          <img className={styles.fabIcon} src={iconUrl} alt="" />
        )}
      </button>
    </div>
  );
}
