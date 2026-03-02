import { useState, useCallback, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import portfolioData from '../data/portfolioContent.json';

// ─── useInView hook ────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold]);
  return [ref, inView];
}

// ─── Contact-info icon map (JSON stores emoji; we use crisp SVGs) ─────────────
const INFO_ICONS = {
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
};

function getIcon(label = '') {
  const l = label.toLowerCase();
  if (l.includes('email') || l.includes('mail')) return INFO_ICONS.email;
  if (l.includes('phone') || l.includes('whatsapp') || l.includes('call')) return INFO_ICONS.phone;
  if (l.includes('location') || l.includes('address') || l.includes('city')) return INFO_ICONS.location;
  if (l.includes('linkedin')) return INFO_ICONS.linkedin;
  if (l.includes('github')) return INFO_ICONS.github;
  return INFO_ICONS.email;
}

// ─── Icon accent per index ────────────────────────────────────────────────────
const INFO_ACCENTS = ['#38bdf8', '#a78bfa', '#34d399', '#fb923c', '#f472b6'];

// ─── Floating label field ─────────────────────────────────────────────────────
function FloatingField({ field, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const isTextarea = !!field.rows;
  const Tag = isTextarea ? 'textarea' : 'input';
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <Tag
        name={field.name}
        type={field.type || 'text'}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={field.required}
        rows={field.rows}
        placeholder=""
        className="field-input w-full px-4 pt-6 pb-2.5 rounded-xl border text-white text-sm bg-transparent outline-none transition-all duration-200"
        style={{
          borderColor: focused ? '#38bdf8' : 'rgba(255,255,255,0.1)',
          background: focused ? 'rgba(56,189,248,0.04)' : 'rgba(255,255,255,0.03)',
          boxShadow: focused ? '0 0 0 1px #38bdf822, 0 4px 20px rgba(56,189,248,0.08)' : 'none',
          resize: isTextarea ? 'none' : undefined,
          minHeight: isTextarea ? '100px' : undefined,
        }}
      />
      <label
        className="absolute left-4 pointer-events-none transition-all duration-200 font-medium"
        style={{
          top: lifted ? '8px' : '50%',
          transform: isTextarea ? (lifted ? 'none' : 'translateY(8px)') : (lifted ? 'none' : 'translateY(-50%)'),
          fontSize: lifted ? '10px' : '13px',
          color: focused ? '#38bdf8' : '#475569',
          letterSpacing: lifted ? '0.05em' : '0',
        }}
      >
        {field.label}{field.required ? ' *' : ''}
      </label>

      {/* Focus dot */}
      {focused && (
        <span
          className="absolute top-2.5 right-3 w-1.5 h-1.5 rounded-full"
          style={{ background: '#38bdf8', boxShadow: '0 0 6px #38bdf8' }}
        />
      )}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ show, type, message }) {
  return (
    <div
      className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl max-w-sm"
      style={{
        background: type === 'success' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(16px)',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0) scale(1)' : 'translateY(-16px) scale(0.95)',
        transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(.22,1,.36,1)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      {type === 'success' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-5 h-5 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-5 h-5 flex-shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      <p className="text-white text-sm font-medium">{message}</p>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Contact() {
  const { contact } = portfolioData;

  const EMAILJS_SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY';

  const [formData, setFormData] = useState(
    Object.fromEntries((contact.form.fields || []).map(f => [f.name, '']))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, type: 'success', message: '' });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast(t => ({ ...t, show: false })), type === 'success' ? 5000 : 7000);
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  formData.name,
          from_email: formData.email,
          subject:    formData.subject,
          message:    formData.message,
          to_name:    'Samir Randeriya',
        },
        EMAILJS_PUBLIC_KEY
      );
      showToast('success', contact.form.successMessage || 'Message sent successfully!');
      setFormData(Object.fromEntries((contact.form.fields || []).map(f => [f.name, ''])));
    } catch (err) {
      showToast('error', err?.text || 'Failed to send. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, contact.form]);

  const [headerRef, headerInView] = useInView(0.2);
  const [availRef,  availInView]  = useInView(0.2);
  const [leftRef,   leftInView]   = useInView(0.1);
  const [rightRef,  rightInView]  = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        #contact * { font-family: 'DM Sans', sans-serif; }
        #contact .font-display { font-family: 'Syne', sans-serif; }

        .grid-subtle {
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .info-card {
          transition: all 0.25s ease;
        }
        .info-card:hover {
          border-color: rgba(255,255,255,0.18) !important;
          background: rgba(255,255,255,0.06) !important;
          transform: translateX(4px);
        }
        .info-card:hover .info-arrow {
          transform: translateX(4px);
          color: white;
        }

        .info-arrow {
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .field-input::placeholder { color: transparent; }
        .field-input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #060811 inset !important;
          -webkit-text-fill-color: white !important;
        }

        @keyframes availPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.4); }
        }
        .avail-dot { animation: availPulse 2s ease-in-out infinite; }
        .avail-dot-ring {
          position: absolute;
          inset: -4px;
          border-radius: 9999px;
          border: 1.5px solid #34d399;
          animation: availPulse 2s ease-in-out infinite 0.3s;
        }

        .submit-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.28s ease;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #818cf8, #f472b6);
          opacity: 0;
          transition: opacity 0.28s;
        }
        .submit-btn:hover::before { opacity: 1; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(56,189,248,0.3); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .submit-btn:disabled:hover { transform: none; box-shadow: none; }
        .submit-btn span { position: relative; z-index: 1; }
      `}</style>

      <Toast show={toast.show} type={toast.type} message={toast.message} />

      <section
        id="contact"
        className="relative py-28 overflow-hidden"
        style={{ background: '#060811' }}
      >
        {/* Background */}
        <div className="absolute inset-0 grid-subtle pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f472b6, transparent 70%)', filter: 'blur(80px)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38bdf8, transparent 70%)', filter: 'blur(80px)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div
            ref={headerRef}
            className="text-center mb-14"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(.22,1,.36,1)',
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-medium tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 inline-block" />
              Get in touch
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              {contact.title.split(' ').slice(0, 2).join(' ')}{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #f472b6, #818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {contact.title.split(' ').slice(2).join(' ')}
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              {contact.subtitle}
            </p>
          </div>

          <div className="space-y-6">

            {/* ── Availability banner — from contact.availability ── */}
            <div
              ref={availRef}
              className="relative rounded-2xl border overflow-hidden p-7 text-center"
              style={{
                background: 'rgba(52,211,153,0.05)',
                borderColor: 'rgba(52,211,153,0.25)',
                opacity: availInView ? 1 : 0,
                transform: availInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(.22,1,.36,1)',
              }}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(600px circle at 50% 50%, rgba(52,211,153,0.07), transparent 70%)' }}
              />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  {/* Pulsing dot */}
                  <span className="relative flex-shrink-0 w-3 h-3">
                    <span className="avail-dot-ring" />
                    <span className="avail-dot relative block w-3 h-3 rounded-full bg-emerald-400" />
                  </span>
                  <h3
                    className="font-display text-xl sm:text-2xl font-black"
                    style={{
                      background: 'linear-gradient(135deg, #34d399, #38bdf8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {contact.availability.status}
                  </h3>
                  <span className="relative flex-shrink-0 w-3 h-3">
                    <span className="avail-dot-ring" style={{ animationDelay: '0.7s' }} />
                    <span className="avail-dot relative block w-3 h-3 rounded-full bg-emerald-400" style={{ animationDelay: '0.7s' }} />
                  </span>
                </div>
                <p className="text-slate-400 text-sm max-w-xl">
                  {contact.availability.description}
                </p>
              </div>
            </div>

            {/* ── Main grid ── */}
            <div className="grid lg:grid-cols-12 gap-6">

              {/* ── Left: Contact Info — from contact.contactInfo ── */}
              <div
                ref={leftRef}
                className="lg:col-span-7 rounded-2xl border p-7"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  opacity: leftInView ? 1 : 0,
                  transform: leftInView ? 'translateX(0)' : 'translateX(-28px)',
                  transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.1s',
                }}
              >
                {/* Section label */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-1 h-7 rounded-full"
                    style={{ background: 'linear-gradient(to bottom, #38bdf8, #818cf8)' }}
                  />
                  <h3 className="font-display text-lg font-black text-white">
                    Contact Information
                  </h3>
                </div>

                <div className="space-y-3">
                  {contact.contactInfo.map((info, i) => {
                    const accent = INFO_ACCENTS[i % INFO_ACCENTS.length];
                    const isExternal = info.link?.startsWith('http');
                    const Tag = info.link ? 'a' : 'div';
                    const linkProps = info.link
                      ? { href: info.link, ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
                      : {};

                    return (
                      <Tag
                        key={i}
                        {...linkProps}
                        className="info-card flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/3 cursor-pointer group"
                        style={{
                          opacity: leftInView ? 1 : 0,
                          transform: leftInView ? 'translateX(0)' : 'translateX(-16px)',
                          transition: `opacity 0.5s ease ${0.15 + i * 0.08}s, transform 0.5s cubic-bezier(.22,1,.36,1) ${0.15 + i * 0.08}s`,
                        }}
                      >
                        {/* Icon bubble */}
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `${accent}18`,
                            border: `1px solid ${accent}30`,
                            color: accent,
                          }}
                        >
                          {getIcon(info.label)}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-500 text-xs font-medium mb-0.5 uppercase tracking-widest">
                            {info.label}
                          </p>
                          <p className="text-white text-sm font-semibold truncate">
                            {info.value}
                          </p>
                        </div>

                        {/* Arrow */}
                        {info.link && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="info-arrow w-4 h-4 text-slate-600 flex-shrink-0"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        )}
                      </Tag>
                    );
                  })}
                </div>

                {/* Response time note */}
                <div
                  className="mt-6 flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/6 bg-white/2"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={1.5} className="w-4 h-4 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-slate-500 text-xs">
                    Typically replies within <span className="text-slate-300 font-medium">24 hours</span>
                  </p>
                </div>
              </div>

              {/* ── Right: Send Message — from contact.form ── */}
              <div
                ref={rightRef}
                className="lg:col-span-5 rounded-2xl border p-7"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  opacity: rightInView ? 1 : 0,
                  transform: rightInView ? 'translateX(0)' : 'translateX(28px)',
                  transition: 'opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.2s',
                }}
              >
                {/* Section label */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-1 h-7 rounded-full"
                    style={{ background: 'linear-gradient(to bottom, #f472b6, #818cf8)' }}
                  />
                  <h3 className="font-display text-lg font-black text-white">
                    {contact.form.title}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {contact.form.fields.map((field, i) => (
                    <div
                      key={field.name}
                      style={{
                        opacity: rightInView ? 1 : 0,
                        transform: rightInView ? 'translateY(0)' : 'translateY(12px)',
                        transition: `opacity 0.4s ease ${0.25 + i * 0.07}s, transform 0.4s ease ${0.25 + i * 0.07}s`,
                      }}
                    >
                      <FloatingField
                        field={field}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-btn w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white"
                    style={{
                      background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                      opacity: rightInView ? 1 : 0,
                      transition: 'opacity 0.4s ease 0.55s, transform 0.28s ease, box-shadow 0.28s ease',
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {contact.form.submittingText || 'Sending…'}
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          {contact.form.submitText || 'Send Message'}
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>

            </div>
          </div>

        </div>

        {/* Edge fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #060811, transparent)' }}
        />
      </section>
    </>
  );
}