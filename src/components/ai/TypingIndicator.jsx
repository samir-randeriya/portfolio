/**
 * Typing Indicator Component
 * 
 * Shows animated dots when AI is "thinking"
 * Clean, minimal design
 */

const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="message-card-assistant rounded-2xl rounded-tl-md px-5 py-4">
        <div className="flex items-center gap-1.5">
          <div className="typing-dot w-2 h-2 rounded-full bg-muted-foreground/60" />
          <div className="typing-dot w-2 h-2 rounded-full bg-muted-foreground/60" />
          <div className="typing-dot w-2 h-2 rounded-full bg-muted-foreground/60" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;

