/**
 * Message List Component
 * 
 * RESPONSIBILITY:
 * - Render all chat messages
 * - Manage auto-scroll to bottom
 * - Display typing indicator
 * 
 * LAYOUT NOTE:
 * - Parent (.ai-messages-scroll) manages scrolling
 * - This component just renders content with proper spacing
 * 
 * TODO: Add virtual scrolling for performance with many messages
 * TODO: Add message grouping by date
 * TODO: Add "scroll to bottom" button when not at bottom
 */

import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="message-list-content">
      <div className="max-w-conversation space-y-4">
        {/* Render all messages */}
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isLatest={index === messages.length - 1}
          />
        ))}

        {/* Show typing indicator when AI is thinking */}
        {isTyping && <TypingIndicator />}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;

