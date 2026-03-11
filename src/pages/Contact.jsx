import portfolioData from '../data/portfolioContent.json';
import { useInView } from '../hooks/useInView';
import { SECTION_IDS, SOCIAL_URLS } from '../constants';
import { INFO_ACCENTS } from '../constants/themes';
import { INFO_ICONS } from '../constants/icons';
import { SiLinkedin, SiWhatsapp } from 'react-icons/si';

function getIcon(label = '') {
  const l = label.toLowerCase();
  if (l.includes('email') || l.includes('mail')) return INFO_ICONS.email;
  if (l.includes('phone') || l.includes('whatsapp') || l.includes('call')) return INFO_ICONS.phone;
  if (l.includes('location') || l.includes('address') || l.includes('city')) return INFO_ICONS.location;
  if (l.includes('linkedin')) return INFO_ICONS.linkedin;
  if (l.includes('github')) return INFO_ICONS.github;
  return INFO_ICONS.email;
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Contact() {
  const { contact, personal } = portfolioData;

  const [headerRef, headerInView] = useInView(0.2);
  const [availRef,  availInView]  = useInView(0.2);
  const [leftRef,   leftInView]   = useInView(0.1);
  const [rightRef,  rightInView]  = useInView(0.1);

  return (
    <>
      <section
        id={SECTION_IDS.CONTACT}
        className="relative py-14 overflow-hidden"
      >
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

            {/* ── Availability banner ── */}
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
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(600px circle at 50% 50%, rgba(52,211,153,0.07), transparent 70%)' }}
              />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
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

              {/* ── Left: Contact Info ── */}
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
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-1 h-7 rounded-full"
                    style={{ background: 'linear-gradient(to bottom, #38bdf8, #818cf8)' }}
                  />
                  <h3 className="font-display text-lg font-black text-white">Contact Information</h3>
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
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${accent}18`, border: `1px solid ${accent}30`, color: accent }}
                        >
                          {getIcon(info.label)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-500 text-xs font-medium mb-0.5 uppercase tracking-widest">
                            {info.label}
                          </p>
                          <p className="text-white text-sm font-semibold truncate">{info.value}</p>
                        </div>
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

                {/* Response time */}
                <div className="mt-6 flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/6 bg-white/2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={1.5} className="w-4 h-4 flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-slate-500 text-xs">
                    Typically replies within <span className="text-slate-300 font-medium">24 hours</span>
                  </p>
                </div>
              </div>

              {/* ── Right: Direct email CTA ── */}
              <div
                ref={rightRef}
                className="lg:col-span-5 rounded-2xl border p-7 flex flex-col"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  opacity: rightInView ? 1 : 0,
                  transform: rightInView ? 'translateX(0)' : 'translateX(28px)',
                  transition: 'opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.2s',
                }}
              >
                {/* Panel label */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-1 h-7 rounded-full"
                    style={{ background: 'linear-gradient(to bottom, #f472b6, #818cf8)' }}
                  />
                  <h3 className="font-display text-lg font-black text-white">Send a Message</h3>
                </div>

                {/* Intro copy */}
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  The fastest way to reach me is directly via email. I read every message and reply within 24 hours.
                </p>

                {/* Email display */}
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/3 mb-6 select-all"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth={1.5} className="w-4 h-4 flex-shrink-0 opacity-70">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-white text-sm font-medium tracking-wide">{personal.email}</span>
                </div>

                {/* Primary CTA — mailto */}
                <a
                  href={`mailto:${personal.email}?subject=Project%20Inquiry`}
                  className="submit-btn w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white text-center flex items-center justify-center gap-2 mb-4"
                  style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Open Email Client
                </a>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-slate-600 text-xs">or connect via</span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                {/* Quick links */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-white/3 text-slate-300 text-xs font-semibold hover:border-white/20 hover:text-white transition-all duration-200"
                  >
                    <SiLinkedin className="w-3.5 h-3.5" style={{ color: '#0A66C2' }} />
                    LinkedIn
                  </a>
                  <a
                    href={SOCIAL_URLS.WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-white/3 text-slate-300 text-xs font-semibold hover:border-white/20 hover:text-white transition-all duration-200"
                  >
                    <SiWhatsapp className="w-3.5 h-3.5" style={{ color: '#25D366' }} />
                    WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Edge fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(6,8,17,0.6), transparent)' }}
        />
      </section>
    </>
  );
}
