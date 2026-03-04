import { useState, useRef, useCallback } from 'react';

const SUGGESTIONS = [
  "What are Samir's skills?",
  "Tell me about his projects",
  "What's his experience?",
  "How many Laravel projects?",
  "Share his resume",
  "How can I contact him?",
];

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.2}
    style={{ width: 15, height: 15 }}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export default function InputBar({ onSend, disabled, showSuggestions }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 140) + 'px';
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    autoResize();
  };

  const submit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <>
      {showSuggestions && (
        <div className="ai-suggestions">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className="ai-chip"
              onClick={() => !disabled && onSend(s)}
              disabled={disabled}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="ai-input-area">
        <div className="ai-input-pill">
          <textarea
            ref={textareaRef}
            className="ai-textarea"
            placeholder="Ask anything about Samir…"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            maxLength={500}
            rows={1}
            aria-label="Message input"
          />
          <button
            className="ai-send-btn"
            onClick={submit}
            disabled={disabled || !value.trim()}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </div>
        <p className="ai-input-hint">
          Press Enter to send · Shift + Enter for new line
        </p>
      </div>
    </>
  );
}