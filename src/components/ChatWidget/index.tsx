import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

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
  // Set on real answers only, which are the only bubbles worth rating: an error
  // or the "paused" notice says nothing about how well the assistant answers.
  // Carries the question so a rating arrives with what it is a rating of.
  question?: string;
};

// A rating, per answer. `id` ties the comment that may follow a 👎 to the
// response the 👎 itself already sent: the form cannot amend a response, so a
// comment arrives as a second one carrying the same id and no rating.
type Rating = {
  id: string;
  value: 'up' | 'down';
  comment: string;
  commentSent: boolean;
};

// Answers can run long; the sheet only needs enough to recognise one. A Sheets
// cell also tops out at 50 000 characters.
const FEEDBACK_ANSWER_CHARS = 4000;

function newRatingId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    // Non-secure contexts (plain-http previews) have no randomUUID.
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

// Where ratings go: a Google Form, whose responses land in a linked sheet.
// `fields` maps each value to the form's question id (entry.N); the ids come
// from the published form and change only if a question is deleted and
// re-added. Set in docusaurus.config.js; absent, no rating buttons are shown.
type FeedbackForm = {
  url: string;
  fields: Record<FeedbackField, string>;
};
type FeedbackField = 'id' | 'rating' | 'comment' | 'question' | 'answer' | 'sources' | 'page' | 'locale';

// Fire and forget. A form-encoded POST is a "simple" request, so no CORS
// preflight; Google sends no CORS headers either, so the response is opaque
// and unread. A failure costs one rating, never the chat.
function postFeedback(form: FeedbackForm, values: Partial<Record<FeedbackField, string>>) {
  const body = new URLSearchParams();
  for (const [field, value] of Object.entries(values)) {
    const entry = form.fields[field as FeedbackField];
    if (entry && value) body.append(entry, value);
  }
  fetch(form.url, { method: 'POST', mode: 'no-cors', body }).catch(() => {});
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
    rateUp: 'Helpful',
    rateDown: 'Not helpful',
    rateThanks: 'Thanks for the feedback!',
    rateComment: 'What was wrong? (optional)',
    rateCommentSend: 'Send',
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
    rateUp: 'Užitečné',
    rateDown: 'Neužitečné',
    rateThanks: 'Děkujeme za zpětnou vazbu!',
    rateComment: 'Co bylo špatně? (nepovinné)',
    rateCommentSend: 'Odeslat',
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

// The chat mascot: the robot from the brand artwork, redrawn whole, so the
// launcher shows the same figure as the illustration. Inline rather than an
// <img> so CSS can reach its parts: the head bobs, the eyes blink, the right
// arm waves now and then, and the launcher's hover tilts the head. `still`
// drops every animation hook, for the header, where motion next to text is a
// distraction; `head` frames just the head and the top of the shoulders, so
// the header shows a close-up of the same robot rather than a second drawing.
//
// Drawn in the illustration's own 2000px coordinates and scaled down by the
// outer transform, so each part can be checked against the artwork. Strokes are
// thicker than the artwork's, since they have to survive at 56px.
//
// The glow under the face is a wider, translucent copy of the same strokes
// instead of an SVG filter: a filter needs an id, and two robots on one page
// would share it.
const ROBOT_INK = '#2b2f33';

function RobotArm() {
  // The robot's right arm as it hangs, drawn relative to its shoulder (0, 0) so
  // the wave can rotate it about that point. The left arm is the same drawing
  // mirrored.
  return (
    <g fill="#e3e8ee" stroke={ROBOT_INK} strokeWidth="26" strokeLinejoin="round">
      <path d="M0 0C-80-10-145 75-160 195L-145 245C-100 265-40 260-20 245C-10 165 5 75 0 0Z" />
      {/* Forearm and hand nudged in toward the body: as drawn they stood off
          it, leaving a gap down the side that made the arms look stuck on.
          Drawn behind the body, so any overlap tucks under it. */}
      <g transform="translate(30 0)">
        <path d="M-170 190C-205 190-235 310-230 450C-210 490-120 500-70 470C-55 350-50 270-55 210C-90 190-140 185-170 190Z" />
        <path d="M-195 460C-205 530-180 590-130 595L-135 540C-130 510-110 510-100 530L-80 570C-60 550-65 490-75 460Z" />
      </g>
    </g>
  );
}

function RobotIcon({
  className,
  still,
  head,
  intro,
}: {
  className?: string;
  still?: boolean;
  head?: boolean;
  intro?: boolean;
}) {
  const a = (name: string) => (still ? undefined : styles[name]);
  const face = 'M755 560Q807 490 860 560M1070 560Q1122 490 1175 560M870 640Q967 725 1065 640';
  const svgClass = [className, !still && (intro ? styles.robotIntro : styles.robotBack)]
    .filter(Boolean)
    .join(' ');
  return (
    <svg className={svgClass} viewBox={head ? '22 3 56 56' : '0 0 100 100'} aria-hidden="true" focusable="false">
      <g className={a('robotRise')}>
        <g transform="translate(50 12) scale(0.05) translate(-967 -215)">
          {/* The waving arm is the one on the viewer's left, which the
              speech bubble's tail points away from. Unmirrored, a positive
              rotation still swings it up and outward, so the wave keyframes
              serve either arm. */}
          <g transform="translate(600 990)">
            <g className={a('robotArm')}>
              <RobotArm />
            </g>
          </g>
          <g transform="translate(1334 990) scale(-1 1)">
            <RobotArm />
          </g>
          <rect x="825" y="880" width="285" height="60" fill="#6b7680" stroke={ROBOT_INK} strokeWidth="22" />
          <path
            d="M967 908C1180 908 1345 960 1345 1150C1345 1450 1170 1690 967 1690C765 1690 590 1450 590 1150C590 960 755 908 967 908Z"
            fill="#e3e8ee"
            stroke={ROBOT_INK}
            strokeWidth="26"
          />
          {/* The HARDWARIO mark across the chest: the official artwork from
              static/img/hardwario-mark.svg (48 x 60), paths unchanged, scaled
              to fill the chest. Whole and large, it reads as the logo even at
              launcher size; the earlier hand-drawn trace version was small
              enough to blur into a red ✕. */}
          <g transform="translate(799 1020) scale(7)">
            <path
              fill="#e30427"
              d="m5.4,0C2.42,0,0,2.42,0,5.4h0c0,2.28,1.45,4.32,3.6,5.08v13.52c0,.99.81,1.8,1.8,1.8.19,0,.37-.03.55-.09l13.77-4.44c1.02,1.34,2.6,2.12,4.28,2.13,2.98,0,5.4-2.42,5.4-5.4h0c0-2.98-2.42-5.4-5.4-5.4-2.92,0-5.31,2.33-5.39,5.25l-11.41,3.68v-11.05c2.15-.76,3.59-2.79,3.6-5.08C10.8,2.42,8.38,0,5.4,0h0s0,0,0,0Z"
            />
            <path
              fill="#e30427"
              d="m42.6,60c2.98,0,5.4-2.42,5.4-5.4h0c0-2.28-1.45-4.32-3.6-5.08v-13.52c0-.99-.81-1.8-1.8-1.8-.19,0-.37.03-.55.09l-13.77,4.44c-1.02-1.34-2.6-2.12-4.28-2.13-2.98,0-5.4,2.42-5.4,5.4h0c0,2.98,2.42,5.4,5.4,5.4h0c2.92,0,5.31-2.33,5.39-5.25l11.41-3.68v11.05c-2.15.76-3.59,2.79-3.6,5.08,0,2.98,2.42,5.4,5.4,5.4h0Z"
            />
            <path
              fill="#6b6a6a"
              d="m42.6,0c-2.98,0-5.4,2.42-5.4,5.4h0c0,2.29,1.44,4.33,3.6,5.09v12.2L4.85,34.29c-.74.24-1.25.93-1.24,1.71v13.51C1.44,50.27,0,52.31,0,54.6c0,2.98,2.42,5.4,5.4,5.4h0c2.98,0,5.4-2.42,5.4-5.4h0c0-2.29-1.44-4.33-3.6-5.09v-12.2l35.95-11.6c.74-.24,1.25-.93,1.25-1.71v-13.52c2.15-.76,3.6-2.8,3.6-5.09C48,2.42,45.58,0,42.6,0h0s0,0,0,0Z"
            />
          </g>
          <g className={a('robotHead')}>
            <rect x="455" y="440" width="90" height="265" rx="45" fill="#d5dbe2" stroke={ROBOT_INK} strokeWidth="26" />
            <rect x="1390" y="440" width="90" height="265" rx="45" fill="#d5dbe2" stroke={ROBOT_INK} strokeWidth="26" />
            <rect x="510" y="215" width="915" height="675" rx="300" fill="#eef1f5" stroke={ROBOT_INK} strokeWidth="26" />
            <rect x="578" y="318" width="778" height="487" rx="150" fill="#c0272d" stroke={ROBOT_INK} strokeWidth="22" />
            <g className={a('robotFace')} fill="none" strokeLinecap="round">
              <path d={face} stroke="#e8fbff" strokeOpacity="0.35" strokeWidth="70" />
              <path d={face} stroke="#e8fbff" strokeWidth="36" />
            </g>
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
            maxLength={2000}
          />
          <button type="submit" disabled={!rating.comment.trim()}>
            {t.rateCommentSend}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ChatWidget() {
  const { siteConfig, i18n } = useDocusaurusContext();
  // The chrome speaks the language of the page it is sitting on.
  const t = textFor(i18n.currentLocale);
  const apiUrl = (siteConfig.customFields?.chatApiUrl as string) || FALLBACK_API_URL;
  // No URL, no rating buttons: offering a 👍 that goes nowhere would be worse
  // than not asking.
  const feedbackForm = siteConfig.customFields?.feedbackForm as FeedbackForm | undefined;

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
  // The robot's entrance (rising into the circle, then a few waves) is for the
  // page load only. Closing the chat remounts the robot, and replaying the
  // entrance then left the circle half empty for most of a second.
  const [intro, setIntro] = useState(true);
  // Ratings by message index, cleared with the conversation they belong to.
  const [ratings, setRatings] = useState<Record<number, Rating>>({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastMsgRef = useRef<HTMLDivElement>(null);

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
    if (!feedbackForm || ratings[i] || !m) return;
    const id = newRatingId();
    setRatings(r => ({ ...r, [i]: { id, value, comment: '', commentSent: false } }));
    postFeedback(feedbackForm, {
      id,
      rating: value,
      question: m.question ?? '',
      answer: m.content.slice(0, FEEDBACK_ANSWER_CHARS),
      sources: (m.sources ?? []).slice(0, 3).map(s => s.url).join(' '),
      // Path only: a query string can carry anything, and the sheet does not
      // need it to know which page the reader was on.
      page: window.location.pathname,
      locale: i18n.currentLocale,
    });
  }

  function sendComment(i: number) {
    const r = ratings[i];
    const comment = r?.comment.trim();
    if (!feedbackForm || !r || !comment || r.commentSent) return;
    setRatings(rs => ({ ...rs, [i]: { ...r, commentSent: true } }));
    postFeedback(feedbackForm, { id: r.id, comment: comment.slice(0, 2000) });
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
                  the thing that was just clicked. Decorative: the title beside
                  it already names it. */}
              <span className={styles.headerAvatar}>
                <RobotIcon className={styles.headerIcon} still head />
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
                  {feedbackForm && m.role === 'assistant' && m.question && (
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
            />
            <button onClick={() => send()} disabled={loading || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}

      {teaser && !open && (
        <div className={styles.teaser}>
          {/* The message is itself a way in: clicking it opens the chat, as
              the robot it points at would. */}
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
          <RobotIcon className={styles.fabIcon} intro={intro} />
        )}
      </button>
    </div>
  );
}
