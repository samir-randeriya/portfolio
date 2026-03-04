// ─── Markdown renderer ────────────────────────────────────────────────────────
// Parses: **bold**, *italic*, bullet lines (•/-/*), section headers (**Label:**),
// [RESUME] trigger, empty lines as breaks. Produces React elements — no raw markers.

function parseLine(str) {
  // Split on **bold** and *italic* together
  // Pattern: (\*\*[^*]+\*\*|\*[^*]+\*)
  const parts = str.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function renderMarkdown(text, resumeUrl) {
  if (!text) return null;

  const lines   = text.split('\n');
  const output  = [];
  let   listBuf = [];
  let   key     = 0;

  const flushList = () => {
    if (!listBuf.length) return;
    output.push(
      <ul key={`ul-${key++}`}>
        {listBuf.map((item, i) => (
          <li key={i}>
            <span className="ai-bullet-arrow">▸</span>
            <span>{parseLine(item)}</span>
          </li>
        ))}
      </ul>
    );
    listBuf = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    // ── empty line ──
    if (!line.trim()) {
      flushList();
      continue;
    }

    // ── [RESUME] trigger ──
    if (/\[RESUME\]/i.test(line)) {
      flushList();
      output.push(
        <a
          key={key++}
          href={resumeUrl || '/resume.pdf'}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="ai-resume-card"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            style={{ width: 15, height: 15, flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Resume (PDF)
        </a>
      );
      continue;
    }

    // ── bullet line — starts with •, -, *, or 1. ──
    if (/^[•\-*]\s+/.test(line.trim()) || /^\d+\.\s+/.test(line.trim())) {
      const content = line.trim()
        .replace(/^[•\-*]\s+/, '')
        .replace(/^\d+\.\s+/, '');
      listBuf.push(content);
      continue;
    }

    // ── section header — entire line is **Something** or **Something:** ──
    if (/^\*\*[^*]+\*\*:?\s*$/.test(line.trim())) {
      flushList();
      const label = line.trim().replace(/^\*\*/, '').replace(/\*\*:?\s*$/, '');
      output.push(<h4 key={key++}>{label}</h4>);
      continue;
    }

    // ── normal paragraph ──
    flushList();
    output.push(<p key={key++}>{parseLine(line)}</p>);
  }

  flushList();
  return output.length ? output : null;
}

// ─── Timestamp formatter ──────────────────────────────────────────────────────
function fmtTime(ts) {
  try {
    const d = ts instanceof Date ? ts : new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch { return ''; }
}

// ─── MessageBubble ─────────────────────────────────────────────────────────────
export default function MessageBubble({ message, resumeUrl }) {
  const isUser = message.type === 'user';

  // ── User bubble ──
  if (isUser) {
    return (
      <div className="ai-msg-row ai-msg-row--user">
        <div className="ai-msg-row-content">
          <div className="ai-bubble-user">{message.content}</div>
          <div className="ai-msg-time">{fmtTime(message.timestamp)}</div>
        </div>
      </div>
    );
  }

  // ── Assistant bubble ──
  return (
    <div className="ai-msg-row ai-msg-row--assistant">
      <div style={{ maxWidth: '80%' }}>
        <div className="ai-bubble-assistant">
          {renderMarkdown(message.content, resumeUrl)}

          {message.infoCollected && (
            <div className="ai-info-banner">
              <svg viewBox="0 0 20 20" fill="currentColor"
                style={{ width: 14, height: 14, flexShrink: 0 }}>
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              {/* infoCollected may itself contain **bold** — parse it too */}
              <span>{parseLine(message.infoCollected)}</span>
            </div>
          )}
        </div>
        <div className="ai-msg-time">{fmtTime(message.timestamp)}</div>
      </div>
    </div>
  );
}