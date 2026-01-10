/**
 * AI Page - Production-Grade Layout Architecture
 * 
 * LAYOUT STRUCTURE:
 * - Fixed viewport container (100vh/dvh)
 * - Navbar: Fixed at top
 * - MessageList: Scrollable area (flex-1)
 * - InputBar: Fixed at bottom
 * 
 * Key principles:
 * - Body scroll is locked when this page is active
 * - Only the message list scrolls
 * - Layout uses proper flexbox constraints
 * - Mobile-responsive with keyboard handling
 * 
 * TODO: Future Integration Points
 * - Connect to real AI API
 * - Implement persistent message storage
 * - Add user authentication
 * - Integrate with portfolio data
 */

import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import MessageList from '../components/ai/MessageList';
import InputBar from '../components/ai/InputBar';
import '../styles/ai.css';

const AIPage = () => {
  // TODO: Replace with real message storage (database, context, etc.)
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Show initial greeting on mount
  useEffect(() => {
    // TODO: Fetch initial greeting from API or portfolio data
    const initialMessage = {
      id: crypto.randomUUID(),
      type: 'assistant',
      content: {
        intro: "Hi! I'm Samir's AI assistant. 👋",
        bullets: [
          'Ask about his **technical skills** and expertise',
          'Learn about his **work experience** and achievements',
          'Explore his **portfolio projects**',
          'Get his **contact information**',
        ],
        followUp: 'What would you like to know?',
      },
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  // Simulate typing delay for natural feel
  // TODO: Remove this when connecting to real AI - use actual response time
  const simulateTypingDelay = useCallback(() => {
    const delay = 700 + Math.random() * 700; // 700-1400ms
    return new Promise((resolve) => setTimeout(resolve, delay));
  }, []);

  // Handle sending messages
  // TODO: Replace with real AI API call
  const handleSendMessage = useCallback(
    async (content) => {
      // Add user message to UI
      const userMessage = {
        id: crypto.randomUUID(),
        type: 'user',
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // TODO: Replace this simulation with real AI API call
      // Example:
      // const response = await fetch('/api/ai/chat', {
      //   method: 'POST',
      //   body: JSON.stringify({ message: content }),
      // });
      // const data = await response.json();

      await simulateTypingDelay();

      // TODO: Replace mock response with real AI response
      const mockResponse = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: {
          intro: 'This is a placeholder response. Real AI logic will be integrated here.',
          bullets: [
            '**TODO**: Connect to AI response engine',
            '**TODO**: Implement out-of-scope detection',
            '**TODO**: Add response variations',
          ],
          followUp: 'Ask another question to test the UI!',
        },
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, mockResponse]);

      // TODO: Handle errors from AI API
      // TODO: Implement retry logic
      // TODO: Add loading states
    },
    [simulateTypingDelay]
  );

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Lock body scroll when AI page is active (prevents mobile scroll issues)
  useEffect(() => {
    // Save original overflow value
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    
    // Lock scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  // Track mouse position for dynamic background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    // PAGE SHELL: Fixed viewport container, no body scroll
    <div className="ai-page-shell">
      {/* BACKGROUND LAYER: Decorative elements behind everything */}
      <div className="ai-background-layer">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-blue-50/10 dark:from-gray-900/50 dark:to-blue-900/10 transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-blue-500/10 via-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* NAVBAR: Fixed at top */}
      <Navbar />

      {/* MAIN CONTENT AREA: Contains centered chat surface */}
      <div className="ai-main-content">
        {/* CHAT SURFACE: Visible bounded container for all chat UI */}
        <div className="ai-chat-surface">
          {/* MESSAGE AREA: Scrollable message list (flex: 1) */}
          <div className="ai-message-area">
            <MessageList messages={messages} isTyping={isTyping} />
          </div>

          {/* INPUT AREA: Pinned at bottom of chat surface */}
          <div className="ai-input-area">
            <InputBar onSend={handleSendMessage} disabled={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPage;

