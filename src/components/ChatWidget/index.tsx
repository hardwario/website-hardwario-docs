import React, { useState, useRef, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// Used only if docusaurus.config.js somehow carries no chatApiUrl.
const FALLBACK_API_URL = 'https://docs-chatbot-beta.vercel.app/api/chat';

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

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
};

export default function ChatWidget() {
  const { siteConfig } = useDocusaurusContext();
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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPaused(readPaused());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send() {
    const query = input.trim();
    if (!query || loading) return;

    setMessages(m => [...m, { role: 'user', content: query }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();

      // Backend is out of credit or misconfigured: show this one message, then
      // take the widget away rather than leave a button that cannot work.
      if (data.paused) {
        markPaused();
        setMessages(m => [...m, {
          role: 'assistant',
          content: data.error || 'The documentation assistant is currently paused.',
        }]);
        // Leave the message on screen long enough to read before it vanishes.
        // `finally` below clears the loading state.
        window.setTimeout(() => setPaused(true), 6000);
        return;
      }

      setMessages(m => [...m, {
        role: 'assistant',
        content: data.answer || data.error || 'Something went wrong, please try again.',
        sources: data.sources,
      }]);
    } catch {
      setMessages(m => [...m, {
        role: 'assistant',
        content: 'Could not reach the server. Please try again.',
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
      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <span>HARDWARIO Docs Assistant</span>
            <button className={styles.close} onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.empty}>
                Ask anything about the HARDWARIO documentation.
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? styles.userMsg : styles.botMsg}>
                <p>{m.content}</p>
                {m.sources && m.sources.length > 0 && (
                  <div className={styles.sources}>
                    <span>Sources:</span>
                    <ul>
                      {m.sources.map(s => (
                        <li key={s}>
                          <a href={s} target="_blank" rel="noopener noreferrer">
                            {s.replace('https://docs.hardwario.com/', '')}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className={styles.botMsg}>
                <span className={styles.typing}>Searching the documentation…</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className={styles.inputRow}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your question…"
              disabled={loading}
              maxLength={500}
            />
            <button onClick={send} disabled={loading || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}

      <button
        className={styles.fab}
        onClick={() => setOpen(o => !o)}
        title="Ask about the documentation"
        aria-label={open ? 'Close the documentation assistant' : 'Ask about the documentation'}
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
