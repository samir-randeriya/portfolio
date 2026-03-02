import { useState } from 'react';

function ImagePreviewModal({ images, initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex);

  if (!images || images.length === 0) return null;

  const showPrev = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 text-slate-300 hover:text-white text-sm font-medium"
        >
          Close ✕
        </button>

        <div className="relative bg-slate-900/80 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
          <img
            src={images[index]}
            alt={`Preview ${index + 1}`}
            className="max-h-[80vh] w-full object-contain"
            loading="lazy"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === index ? '20px' : '8px',
                  height: '8px',
                  background: i === index ? 'rgba(248,250,252,1)' : 'rgba(148,163,184,0.7)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagePreviewModal;

