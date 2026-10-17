import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfm } from 'micromark-extension-gfm';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import type { Nodes, Parents } from 'mdast';
import styles from './styles.module.css';

// Answers are Markdown. The backend asks for links, bullet lines and code
// formatting, and the model writes `inline code` and fenced blocks whether asked
// or not. The first renderer handled bold and links with regexes and left the
// rest as literal text — backticks around every register name, ``` fences around
// code, "- " in front of every bullet — which is what colleagues saw first.
//
// So the answer is parsed as CommonMark + GFM and rendered node by node. Only
// the node types below become elements; nothing is ever interpreted as HTML (raw
// HTML nodes are shown as their text), and only http(s) and mailto links are
// followed. That keeps it as injection-proof as the regex version was.

export type Source = {
  url: string;
  title?: string;
  site?: 'docs' | 'www' | 'store';
};

// Last resort for a URL that is not among the sources: "…/sim-card-setup"
// becomes "sim card setup", which still beats showing the whole path.
export function prettifyUrl(url: string) {
  const path = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/+$/, '');
  const segments = path.split('/');
  // ".../apps/thingsboard/index" is the ThingsBoard page, not a page called
  // "index" — the segment that names it is the directory above.
  if (segments.length > 1 && segments[segments.length - 1] === 'index') segments.pop();
  const last = segments.pop() || path;
  return last.replace(/[-_]+/g, ' ') || path;
}

// Page titles carry the site name ("Ordering Codes | HARDWARIO Docs"); inside the
// docs that suffix says nothing.
export function cleanTitle(title: string) {
  return title.replace(/\s*\|\s*HARDWARIO.*$/i, '');
}

// A documentation URL is a page of the site this widget is already on, so it
// should navigate rather than spawn a tab. Returns the path to route to, or
// null for anything off-site.
const DOCS_ORIGIN = 'https://docs.hardwario.com';

export function internalPath(url: string): string | null {
  if (!url.startsWith(`${DOCS_ORIGIN}/`) && url !== DOCS_ORIGIN) return null;
  return url.slice(DOCS_ORIGIN.length) || '/';
}

// The widget is mounted in theme/Root, so it survives client-side navigation:
// following a source changes the page underneath while the conversation stays
// open. A plain <a> would reload the document and lose it, so documentation
// links go through Docusaurus's router — which also adds the /cs/ prefix on the
// Czech site, since the locale's baseUrl is applied to every internal path.
// Store and website links are a different site and keep opening in a new tab,
// so leaving the docs is deliberate.
export function SourceLink({
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

const SAFE_URL = /^https?:\/\//i;
const MAILTO = /^mailto:[^\s]+$/i;
// Only a plain language name reaches the highlighter's class name.
const CODE_LANG = /^[a-z0-9+#-]{1,20}$/i;

type Labels = { copy: string; copied: string };
type Ctx = { titleByUrl: Map<string, string>; labels: Labels };

// Not the theme's CodeBlock: the widget is mounted in theme/Root, outside the
// ColorModeProvider that CodeBlock (through usePrismTheme) requires, and using
// it there crashed the whole page the first time an answer contained code. A
// plain block with a copy button is what a chat answer needs anyway.
function ChatCode({ code, lang, labels }: { code: string; lang?: string; labels: Labels }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      },
      () => {},
    );
  };
  return (
    <div className={styles.code}>
      <button type="button" className={styles.codeCopy} onClick={copy}>
        {copied ? labels.copied : labels.copy}
      </button>
      <pre>
        <code className={lang ? `language-${lang}` : undefined}>{code}</code>
      </pre>
    </div>
  );
}

function plainText(node: Nodes): string {
  if ('value' in node && typeof node.value === 'string') return node.value;
  if ('children' in node) return (node.children as Nodes[]).map(plainText).join('');
  return '';
}

function children(node: Parents, ctx: Ctx, key: string): React.ReactNode[] {
  return (node.children as Nodes[]).map((c, i) => render(c, ctx, `${key}.${i}`));
}

function render(node: Nodes, ctx: Ctx, key: string): React.ReactNode {
  switch (node.type) {
    case 'root':
      return <React.Fragment key={key}>{children(node, ctx, key)}</React.Fragment>;
    case 'paragraph':
      return <p key={key}>{children(node, ctx, key)}</p>;
    // The bubble is too small for a heading to mean anything, but the line it
    // marks is still wanted — so it reads as a bold line.
    case 'heading':
      return (
        <p key={key}>
          <strong>{children(node, ctx, key)}</strong>
        </p>
      );
    case 'text':
      return node.value;
    case 'strong':
      return <strong key={key}>{children(node, ctx, key)}</strong>;
    case 'emphasis':
      return <em key={key}>{children(node, ctx, key)}</em>;
    case 'delete':
      return <del key={key}>{children(node, ctx, key)}</del>;
    case 'inlineCode':
      return <code key={key}>{node.value}</code>;
    case 'break':
      return <br key={key} />;
    case 'thematicBreak':
      return <hr key={key} />;
    case 'blockquote':
      return <blockquote key={key}>{children(node, ctx, key)}</blockquote>;
    case 'list': {
      const items = children(node, ctx, key);
      return node.ordered ? (
        <ol key={key} start={node.start ?? undefined}>
          {items}
        </ol>
      ) : (
        <ul key={key}>{items}</ul>
      );
    }
    case 'listItem':
      // A tight list wraps each item's text in a paragraph too; unwrapping it
      // keeps the item from picking up paragraph margins.
      return (
        <li key={key}>
          {node.children.map((c, i) =>
            c.type === 'paragraph' && !node.spread
              ? children(c, ctx, `${key}.${i}`)
              : render(c, ctx, `${key}.${i}`),
          )}
        </li>
      );
    case 'code': {
      const lang = node.lang && CODE_LANG.test(node.lang) ? node.lang : undefined;
      return (
        <ChatCode key={key} code={node.value} lang={lang} labels={ctx.labels} />
      );
    }
    case 'link': {
      const url = node.url;
      if (MAILTO.test(url)) {
        return (
          <a key={key} href={url}>
            {children(node, ctx, key)}
          </a>
        );
      }
      if (!SAFE_URL.test(url)) return <React.Fragment key={key}>{children(node, ctx, key)}</React.Fragment>;
      // A bare URL in the text (GFM autolink) is shown as the page it points
      // at: the title from `sources` when the backend sent one, else the slug.
      const label = plainText(node);
      const bare = label === url || label.replace(/\/+$/, '') === url.replace(/\/+$/, '');
      const title = ctx.titleByUrl.get(url.replace(/\/+$/, ''));
      return (
        <SourceLink key={key} url={url}>
          {bare ? cleanTitle(title || prettifyUrl(url)) : children(node, ctx, key)}
        </SourceLink>
      );
    }
    case 'image':
      return SAFE_URL.test(node.url) ? (
        <SourceLink key={key} url={node.url}>
          {node.alt || prettifyUrl(node.url)}
        </SourceLink>
      ) : null;
    case 'table':
      return (
        <div key={key} style={{ overflowX: 'auto' }}>
          <table>
            <tbody>{children(node, ctx, key)}</tbody>
          </table>
        </div>
      );
    case 'tableRow':
      return <tr key={key}>{children(node, ctx, key)}</tr>;
    case 'tableCell':
      return <td key={key}>{children(node, ctx, key)}</td>;
    // Raw HTML is shown as written, never interpreted.
    case 'html':
      return node.value;
    default:
      return 'children' in node ? (
        <React.Fragment key={key}>{children(node as Parents, ctx, key)}</React.Fragment>
      ) : null;
  }
}

export function renderAnswer(
  text: string,
  sources: Source[] = [],
  labels: Labels = { copy: 'Copy', copied: 'Copied' },
): React.ReactNode {
  const titleByUrl = new Map(
    sources.filter((s) => s.title).map((s) => [s.url.replace(/\/+$/, ''), s.title as string]),
  );
  try {
    const tree = fromMarkdown(text, {
      extensions: [gfm()],
      mdastExtensions: [gfmFromMarkdown()],
    });
    return render(tree, { titleByUrl, labels }, 'm');
  } catch {
    // A parser failure costs the formatting, never the answer.
    return <p>{text}</p>;
  }
}
