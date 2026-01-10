/**
 * Input Bar Component
 * 
 * Google-style input with auto-resize textarea
 * Send button with visual feedback
 * 
 * TODO: Add voice input support
 * TODO: Add file attachment support
 * TODO: Add character counter
 * TODO: Add input validation
 */

import { useState, useRef, useEffect } from 'react';

const InputBar = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Handle form submission
  const handleSubmit = () => {
    const trimmed = input.trim();
    if (trimmed && !disabled) {
      // TODO: Add input validation here
      // TODO: Check for spam/abuse
      // TODO: Rate limiting
      
      onSend(trimmed);
      setInput('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    // TODO: Add more keyboard shortcuts
    // - Ctrl+K for command palette
    // - Ctrl+/ for help
  };

  // Handle textarea auto-resize
  const handleChange = (e) => {
    setInput(e.target.value);

    // Auto-resize textarea based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = '24px'; // Reset to min height
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, 24), 150);
      textareaRef.current.style.height = `${newHeight}px`;
      
      // Show scrollbar only when content exceeds max-height (multiple lines)
      if (scrollHeight > 150) {
        textareaRef.current.classList.add('scrollable');
      } else {
        textareaRef.current.classList.remove('scrollable');
      }
    }
  };

  const canSend = input.trim().length > 0 && !disabled;

  return (
    <div className="input-bar-container">
      <div className="input-bar-wrapper">
        {/* Input container */}
        <div className="input-pill">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about Samir..."
            disabled={disabled}
            rows={1}
            className="input-textarea"
            maxLength={500}
          />

          {/* Send button */}
          <button
            onClick={handleSubmit}
            disabled={!canSend}
            className="send-button"
            aria-label="Send message"
            title={canSend ? 'Send message' : 'Type a message first'}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>

        {/* Helper text */}
        <p className="input-helper-text">
          Press Enter to send · Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};

export default InputBar;

