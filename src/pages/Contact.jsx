import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import portfolioData from '../data/portfolioContent.json';
import { useInView } from '../hooks/useInView';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, isEmailConfigured } from '../constants/env';
import { SECTION_IDS, BACKGROUND_DARK } from '../constants';
import { INFO_ACCENTS } from '../constants/themes';
import { INFO_ICONS } from '../constants/icons';

function getIcon(label = '') {
  const l = label.toLowerCase();
  if (l.includes('email') || l.includes('mail')) return INFO_ICONS.email;
  if (l.includes('phone') || l.includes('whatsapp') || l.includes('call')) return INFO_ICONS.phone;
  if (l.includes('location') || l.includes('address') || l.includes('city')) return INFO_ICONS.location;
  if (l.includes('linkedin')) return INFO_ICONS.linkedin;
  if (l.includes('github')) return INFO_ICONS.github;
  return INFO_ICONS.email;
}

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

  if (!isEmailConfigured) {
    console.error('EmailJS credentials are missing. Set REACT_APP_EMAILJS_* environment variables.');
  }

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
      <Toast show={toast.show} type={toast.type} message={toast.message} />

      <section
        id={SECTION_IDS.CONTACT}
        className="relative py-28 overflow-hidden"
        style={{ background: BACKGROUND_DARK }}
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

                {!isEmailConfigured && (
                  <p className="text-amber-400/90 text-sm mb-4">
                    Contact form is currently unavailable.
                  </p>
                )}

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
                    disabled={!isEmailConfigured || isSubmitting}
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
          style={{ background: `linear-gradient(to top, ${BACKGROUND_DARK}, transparent)` }}
        />
      </section>
    </>
  );
}