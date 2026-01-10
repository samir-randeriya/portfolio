/**
 * Message Bubble Component
 * 
 * Renders user and assistant messages with beautiful styling
 * Supports structured content (intro, bullets, follow-up)
 * 
 * TODO: Add message actions (copy, regenerate, etc.)
 * TODO: Add timestamp display
 * TODO: Add message reactions
 */

const MessageBubble = ({ message, isLatest }) => {
  const isUser = message.type === 'user';

  // User message - simple text bubble
  if (isUser) {
    return (
      <div
        className={`flex justify-end ${isLatest ? 'animate-fade-in-up' : ''}`}
        style={{ animationDelay: '0ms' }}
      >
        <div className="message-card-user rounded-2xl rounded-tr-md px-5 py-3 max-w-[85%] md:max-w-[70%]">
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  // Assistant message - structured content
  const content = message.content;

  return (
    <div
      className={`flex justify-start ${isLatest ? 'animate-fade-in-up' : ''}`}
      style={{ animationDelay: '0ms' }}
    >
      <div className="message-card-assistant rounded-2xl rounded-tl-md px-5 py-4 max-w-[90%] md:max-w-[80%]">
        {/* Intro text */}
        <p className="text-[15px] leading-relaxed mb-3">{content.intro}</p>

        {/* Bullet points */}
        {content.bullets && content.bullets.length > 0 && (
          <ul className="space-y-2 mb-3">
            {content.bullets.map((bullet, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-[14px] leading-relaxed"
              >
                <span className="text-accent mt-1 text-xs">●</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: bullet.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="font-semibold">$1</strong>'
                    ),
                  }}
                />
              </li>
            ))}
          </ul>
        )}

        {/* Follow-up suggestion */}
        {content.followUp && (
          <p className="text-[14px] text-muted-foreground italic">
            {content.followUp}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;

