import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAIResponse, getInitialMessage, resetConversationState } from '../data/aiResponses';
import { parseBold } from '../utils/parseBold';
import portfolioData from '../data/portfolioContent.json';
import { Button, PageShell } from '../components/ui';
import DarkModeToggle from '../components/DarkModeToggle';

export default function AIPage() {
  const { personal, navigation, hero } = portfolioData;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    resetConversationState();
    setMessages([getInitialMessage()]);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  const send = async (text) => {
    const trimmed = (text || '').trim();
    if (!trimmed || busy) return;
    const userMsg = { id: `u_${Date.now()}`, type: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setBusy(true);
    try {
      const reply = await getAIResponse(trimmed);
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e_${Date.now()}`,
          type: 'assistant',
          content: `Couldn’t answer that. Email ${personal.email} instead.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink relative">
      <div className="fixed inset-0 dot-grid opacity-40 pointer-events-none" aria-hidden />

      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-md">
        <PageShell className="flex items-center justify-between h-14 sm:h-16">
          <Link
            to="/"
            className="font-mono text-[15px] font-semibold text-ink-bright inline-flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
            {navigation.brand.name}
            <span className="text-ink-dim">{navigation.brand.tld || '.dev'}</span>
          </Link>
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <Button as={Link} to="/" variant="secondary" className="min-h-[36px] text-xs py-2">
              $ cd ~
            </Button>
          </div>
        </PageShell>
      </header>

      <PageShell className="relative z-10 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs text-ink-dim mb-2">~/ask-me.sh</p>
          <h1 className="text-title font-semibold text-ink-bright mb-2">
            Ask about the work
          </h1>
          <p className="text-sm text-ink-dim mb-8 max-w-xl">
            Quick answers from the portfolio: stack, projects, experience, and contact.
          </p>

          <div className="bg-surface border border-border rounded-lg p-4 sm:p-5 flex flex-col min-h-[60vh]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <span className="font-mono text-xs text-ink-dim">session</span>
              <span className="font-mono text-[11px] text-accent flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
                ready
              </span>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`text-sm leading-relaxed ${
                    m.type === 'user' ? 'text-ink-bright' : 'text-ink-dim'
                  }`}
                >
                  <span className="font-mono text-[11px] text-ink-faint mr-2">
                    {m.type === 'user' ? '>' : '//'}
                  </span>
                  <span className="whitespace-pre-wrap">{parseBold(m.content)}</span>
                </div>
              ))}
              {busy && <p className="font-mono text-xs text-ink-faint">…</p>}
            </div>

            {(hero.chatPrompts || []).length > 0 && messages.length < 3 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {hero.chatPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    disabled={busy}
                    onClick={() => send(p)}
                    className="font-mono text-[11px] px-2.5 py-1.5 rounded-sm border border-border text-ink-dim hover:text-accent hover:border-accent/40 min-h-[36px]"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            <form
              className="field-shell flex items-center gap-2 border border-border-strong rounded-md bg-bg px-3 py-2 transition-[border-color,box-shadow]"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ask about stack, projects, contact…"
                className="flex-1 min-w-0 bg-transparent border-0 shadow-none outline-none text-sm text-ink-bright placeholder:text-ink-faint"
                disabled={busy}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="font-mono text-xs text-accent disabled:text-ink-faint min-h-[36px] px-2"
              >
                send ↵
              </button>
            </form>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
