import { useState, useEffect, useRef, useCallback } from 'react';
import MessageList from '../components/ai/MessageList';
import InputBar    from '../components/ai/InputBar';
import {
  getInitialMessage,
  getAIResponse,
  resetConversationState,
} from '../data/aiResponses';
import portfolioData from '../data/portfolioContent.json';
import '../styles/ai.css';

const { personal, navigation } = portfolioData;

// ─── Background — pixel-perfect copy of Home.jsx layers ───────────────────────
// Same grid, same orbs (top-left cyan, bottom-right violet, mid-right pink)
function AIBackground() {
  return (
    <div className="ai-bg-layer">
      <div className="ai-bg-grid" />
      <div className="ai-bg-noise" />
      <div className="ai-bg-orb ai-bg-orb-1" />
      <div className="ai-bg-orb ai-bg-orb-2" />
      <div className="ai-bg-orb ai-bg-orb-3" />
    </div>
  );
}

// ─── Navbar — mirrors Navbar.jsx exactly ──────────────────────────────────────
function AINavbar() {
  const navigate = (href) => {
    if (href === '#chat') return;
    sessionStorage.setItem('ai_scrollTo', href.replace('#', ''));
    window.location.href = '/';
  };

  return (
    <div className="ai-navbar-slot">
      <div className="ai-navbar-inner">

        {/* Brand */}
        <button className="ai-navbar-brand" onClick={() => (window.location.href = '/')}>
          <div className="ai-navbar-avatar">{personal.initials}</div>
          <div className="ai-navbar-brand-text">
            <div className="ai-navbar-name">{personal.name}</div>
            <div className="ai-navbar-subtitle">{personal.title}</div>
          </div>
        </button>

        {/* Nav items */}
        <nav className="ai-navbar-nav">
          {navigation.menuItems.map((item) => (
            <button
              key={item.name}
              className={`ai-nav-btn${item.name === 'AI Chat' ? ' active' : ''}`}
              onClick={() => navigate(item.href)}
            >
              {item.name}
            </button>
          ))}
        </nav>

      </div>
    </div>
  );
}

// ─── Under progress — placeholder when AI chat is not yet live ─────────────────
function AIUnderProgress() {
  useEffect(() => {
    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      width: document.body.style.width,
    };
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    return () => {
      document.body.style.overflow = prev.overflow;
      document.body.style.position = prev.position;
      document.body.style.width = prev.width;
    };
  }, []);

  return (
    <div className="ai-page-shell">
      <AIBackground />
      <AINavbar />

      <div className="ai-main-content">
        <div className="ai-under-progress-content">
          <div className="ai-under-progress-icon">🚧</div>
          <h2 className="ai-under-progress-title">Under progress</h2>
          <p className="ai-under-progress-text">
            AI Chat is being built. Check back soon or reach out directly.
          </p>
          <a href={`mailto:${personal.email}`} className="ai-under-progress-cta">
            Contact Samir
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Export: show Under progress; full chat implementation commented below ──────
export default function AIPage() {
  return <AIUnderProgress />;
}

/* ─── COMMENTED: Full AI Chat implementation (do not remove) ──────────────────
// ─── Chat header ──────────────────────────────────────────────────────────────
function ChatHeader({ msgCount }) {
  return (
    <div className="ai-chat-header">
      <div className="ai-chat-header-left">
        <div className="ai-bot-avatar">
          🤖
          <span className="ai-bot-avatar-dot" />
        </div>
        <div>
          <div className="ai-bot-name">Samir's AI Assistant</div>
          <div className="ai-bot-status">● Online · Powered by Claude AI</div>
        </div>
      </div>

      <div className="ai-chat-header-right">
        <div className="ai-header-badge">
          <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 11, height: 11 }}>
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
          {msgCount} messages
        </div>
        <div className="ai-header-badge">
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#34d399', display: 'inline-block',
            boxShadow: '0 0 6px #34d399',
          }} />
          Available for hire
        </div>
      </div>
    </div>
  );
}

// ─── Main AIPage (full chat) ───────────────────────────────────────────────────
function AIPageFull() {
  const [messages,   setMessages]   = useState(() => [getInitialMessage()]);
  const [isTyping,   setIsTyping]   = useState(false);
  const [isFarewell, setIsFarewell] = useState(false);
  const [error,      setError]      = useState(null);

  const historyRef = useRef([]);

  useEffect(() => {
    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      width:    document.body.style.width,
    };
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width    = '100%';

    return () => {
      document.body.style.overflow = prev.overflow;
      document.body.style.position = prev.position;
      document.body.style.width    = prev.width;
      resetConversationState();
    };
  }, []);

  useEffect(() => {
    const target = sessionStorage.getItem('ai_scrollTo');
    if (target) {
      sessionStorage.removeItem('ai_scrollTo');
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }, []);

  const handleSend = useCallback(async (content) => {
    if (isFarewell || isTyping) return;
    setError(null);

    const userMsg = {
      id: `u_${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    const historySnapshot = [...historyRef.current];
    historyRef.current    = [...historyRef.current, { type: 'user', content }];
    setIsTyping(true);

    try {
      const reply = await getAIResponse(content, historySnapshot);
      historyRef.current = [...historyRef.current, { type: 'assistant', content: reply.content }];
      setMessages(prev => [...prev, reply]);
      if (reply.isFarewell) setIsFarewell(true);
    } catch (err) {
      console.error('[AIPage]', err);
      const fallback = {
        id:            `err_${Date.now()}`,
        type:          'assistant',
        content:       `Something went wrong. Reach Samir directly:\n\n• **Email:** ${personal.email}\n• **LinkedIn:** ${personal.linkedin}`,
        timestamp:     new Date(),
        infoCollected: null,
        isFarewell:    false,
      };
      setMessages(prev => [...prev, fallback]);
      setError('Could not fetch response — try again.');
      historyRef.current = historyRef.current.slice(0, -1);
    } finally {
      setIsTyping(false);
    }
  }, [isFarewell, isTyping]);

  const showSuggestions = messages.length <= 1 && !isTyping;

  return (
    <div className="ai-page-shell">
      <AIBackground />
      <AINavbar />
      <div className="ai-main-content">
        <div className="ai-chat-surface">
          <ChatHeader msgCount={messages.length} />
          <MessageList
            messages={messages}
            isTyping={isTyping}
            resumeUrl={personal.resumeUrl}
          />
          {error && (
            <div className="ai-error-banner">⚠️ {error}</div>
          )}
          {isFarewell && (
            <div className="ai-farewell-banner">
              👋 Conversation ended.{' '}
              <a href={`mailto:${personal.email}`}>Email Samir</a>
              {' '}or{' '}
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: 'none', border: 'none', padding: 0,
                  color: 'var(--ai-cyan)', cursor: 'pointer',
                  font: 'inherit', textDecoration: 'underline',
                }}
              >
                start a new chat
              </button>.
            </div>
          )}
          {!isFarewell && (
            <InputBar
              onSend={handleSend}
              disabled={isTyping}
              showSuggestions={showSuggestions}
            />
          )}
        </div>
      </div>
    </div>
  );
}
──────────────────────────────────────────────────────────────────────────────── */