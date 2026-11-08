import React, { useEffect, useRef, useState } from 'react';
import { getAIResponse, getInitialMessage, resetConversationState } from '../data/aiResponses';
import { parseBold } from '../utils/parseBold';
import portfolioData from '../data/portfolioContent.json';

export default function HeroAskChat() {
  const prompts = portfolioData.hero.chatPrompts || [];
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    resetConversationState();
    setMessages([getInitialMessage()]);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, busy]);

  const send = async (text) => {
    const trimmed = (text || '').trim();
    if (!trimmed || busy) return;

    const userMsg = {
      id: `u_${Date.now()}`,
      type: 'user',
      content: trimmed,
    };
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
          content: `Couldn’t answer that. Email ${portfolioData.personal.email} instead.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      id="chat"
      className="bg-surface border border-border rounded-lg p-[18px] flex flex-col min-h-[360px] sm:min-h-[400px]"
    >
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-border">
        <div className="font-mono text-xs text-ink-dim">~/ask-me.sh</div>
        <div className="font-mono text-[11px] text-accent flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
          ready
        </div>
      </div>

      <div
        ref={listRef}
        className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3 max-h-[220px] sm:max-h-[260px]"
      >
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
        {busy && <div className="font-mono text-xs text-ink-faint">…</div>}
      </div>

      {prompts.length > 0 && messages.length < 3 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {prompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => send(p)}
              disabled={busy}
              className="font-mono text-[11px] px-2.5 py-1.5 rounded-sm border border-border text-ink-dim hover:text-accent hover:border-accent/40 transition-colors min-h-[36px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
          aria-label="Ask about Samir"
          className="flex-1 min-w-0 bg-transparent border-0 shadow-none outline-none text-sm text-ink-bright placeholder:text-ink-faint font-sans"
          disabled={busy}
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="shrink-0 font-mono text-xs text-accent disabled:text-ink-faint min-h-[36px] px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          send ↵
        </button>
      </form>
    </div>
  );
}
