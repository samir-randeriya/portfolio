import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { NAV_ANCHORS, SECTION_IDS } from '../constants';

/* ─────────────────────────────────────────────
   6 process steps
───────────────────────────────────────────── */
const STEPS = [
  {
    id: '01', title: 'Requirements', sub: 'Understand',
    from: '#38bdf8', to: '#6366f1',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:22,height:22}}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>,
    points: ['Business goals & vision', 'Stakeholder interviews', 'Scope, timeline & budget'],
  },
  {
    id: '02', title: 'Design & Plan', sub: 'Architecture',
    from: '#a78bfa', to: '#f472b6',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:22,height:22}}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/></svg>,
    points: ['System architecture', 'UI/UX wireframes', 'Tech stack selection'],
  },
  {
    id: '03', title: 'DB & APIs', sub: 'Data Layer',
    from: '#fb923c', to: '#f43f5e',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:22,height:22}}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/></svg>,
    points: ['Database schema design', 'RESTful API design', 'API docs & contracts'],
  },
  {
    id: '04', title: 'Build', sub: 'Development',
    from: '#34d399', to: '#38bdf8',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:22,height:22}}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/></svg>,
    points: ['Frontend development', 'Backend development', 'Code reviews & testing'],
  },
  {
    id: '05', title: 'Optimise', sub: 'QA & Testing',
    from: '#facc15', to: '#fb923c',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:22,height:22}}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    points: ['Performance testing', 'Security audits', 'Bug fixes & refinement'],
  },
  {
    id: '06', title: 'Deploy', sub: 'Production',
    from: '#818cf8', to: '#c4b5fd',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{width:22,height:22}}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>,
    points: ['CI/CD pipeline setup', 'Production deployment', 'Monitoring & support'],
  },
];

/* ─────────────────────────────────────────────
   Card
───────────────────────────────────────────── */
function Card({ step, inView, delay, hovered, onHover, onLeave }) {
  const h = hovered;
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        borderRadius: 16,
        background: h ? `linear-gradient(145deg,${step.from}16,${step.to}08)` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${h ? step.from + '70' : 'rgba(255,255,255,0.09)'}`,
        padding: '18px 16px 16px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        position: 'relative', overflow: 'hidden', cursor: 'default',
        boxShadow: h ? `0 18px 48px rgba(0,0,0,0.5),0 0 32px ${step.from}22` : '0 2px 12px rgba(0,0,0,0.2)',
        opacity: inView ? 1 : 0,
        transform: inView ? (h ? 'translateY(-6px) scale(1.02)' : 'none') : 'translateY(28px) scale(0.97)',
        transition: `opacity .6s ease ${delay}s, transform .55s cubic-bezier(.22,1,.36,1) ${delay}s, border-color .2s, background .2s, box-shadow .25s`,
        height: '100%', boxSizing: 'border-box',
      }}
    >
      {/* top gradient bar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, borderRadius:'16px 16px 0 0',
        background:`linear-gradient(to right,${step.from},${step.to})`, opacity: h ? 1 : 0.35, transition:'opacity .2s' }}/>
      {/* glow */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', borderRadius:16,
        background:`radial-gradient(140px circle at 50% 0%,${step.from}16,transparent 70%)`,
        opacity: h ? 1 : 0, transition:'opacity .35s' }}/>
      {/* step id */}
      <div style={{ position:'absolute', top:10, right:12, fontSize:10, fontWeight:800,
        fontFamily:'Syne,sans-serif', opacity:.5,
        background:`linear-gradient(135deg,${step.from},${step.to})`,
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{step.id}</div>
      {/* icon */}
      <div style={{ width:46, height:46, borderRadius:12, flexShrink:0,
        background:`linear-gradient(135deg,${step.from}22,${step.to}22)`,
        border:`1px solid ${step.from}44`, color:step.from,
        display:'flex', alignItems:'center', justifyContent:'center',
        transform: h ? 'scale(1.1)' : 'scale(1)', transition:'transform .2s',
        position:'relative', zIndex:1 }}>
        {step.icon}
      </div>
      {/* title + subtitle */}
      <div style={{ textAlign:'center', position:'relative', zIndex:1 }}>
        <h3 style={{ fontSize:14, fontWeight:800, margin:'0 0 2px', fontFamily:'Syne,sans-serif', lineHeight:1.2,
          background:`linear-gradient(135deg,${step.from},${step.to})`,
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{step.title}</h3>
        <p style={{ fontSize:10, color:'#6b7280', margin:0, fontWeight:500,
          letterSpacing:'.4px', textTransform:'uppercase' }}>{step.sub}</p>
      </div>
      {/* divider */}
      <div style={{ width:'100%', height:1, background:'rgba(255,255,255,0.06)', position:'relative', zIndex:1 }}/>
      {/* bullets */}
      <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:5, position:'relative', zIndex:1 }}>
        {step.points.map(p => (
          <div key={p} style={{ display:'flex', alignItems:'flex-start', gap:6 }}>
            <span style={{ color:step.from, fontSize:10, flexShrink:0, marginTop:2, fontWeight:700 }}>✓</span>
            <span style={{ fontSize:11, color:'#4b5563', lineHeight:1.4 }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Horizontal arrow (right or left)
───────────────────────────────────────────── */
function HArrow({ fromColor, toColor, dir, inView, delay }) {
  const id = `ha${delay}${dir}`.replace(/\./g,'_');
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%',
      opacity: inView ? 1 : 0, transition:`opacity .5s ease ${delay}s` }}>
      <svg width="52" height="22" viewBox="0 0 52 22" style={{ overflow:'visible' }}>
        <defs>
          <linearGradient id={id}
            x1={dir==='right'?'0%':'100%'} y1="0%"
            x2={dir==='right'?'100%':'0%'} y2="0%">
            <stop offset="0%"   stopColor={fromColor} stopOpacity=".9"/>
            <stop offset="100%" stopColor={toColor}   stopOpacity=".9"/>
          </linearGradient>
        </defs>
        {dir === 'right' ? (
          <>
            <line x1="2"  y1="11" x2="40" y2="11" stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round"/>
            <polyline points="32,4 46,11 32,18" fill="none" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </>
        ) : (
          <>
            <line x1="50" y1="11" x2="12" y2="11" stroke={`url(#${id})`} strokeWidth="2.2" strokeLinecap="round"/>
            <polyline points="20,4 6,11 20,18"  fill="none" stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </>
        )}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Down-arrow connector (between rows, on the
   RIGHT side — centre of the 3rd column)
───────────────────────────────────────────── */
function DownArrow({ fromColor, toColor, inView, delay }) {
  return (
    <div style={{ opacity: inView ? 1 : 0, transition:`opacity .5s ease ${delay}s`,
      display:'flex', justifyContent:'center', alignItems:'center', height:'100%' }}>
      <svg width="22" height="56" viewBox="0 0 22 56" style={{ overflow:'visible' }}>
        <defs>
          <linearGradient id="downArr" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor={fromColor} stopOpacity=".9"/>
            <stop offset="100%" stopColor={toColor}   stopOpacity=".9"/>
          </linearGradient>
        </defs>
        <line x1="11" y1="2" x2="11" y2="42" stroke="url(#downArr)" strokeWidth="2.2" strokeLinecap="round"/>
        <polyline points="3,34 11,46 19,34" fill="none" stroke={toColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function Process() {
  const [headerRef, headerInView] = useInView(0.2);
  const [roadRef,   roadInView]   = useInView(0.05);
  const [ctaRef,    ctaInView]    = useInView(0.2);
  const [hov, setHov] = useState(null);

  /*
    CSS Grid layout — 5 columns × 4 rows:
    Cols:  card  | arrow | card  | arrow | card
    Width: 1fr     52px   1fr     52px    1fr

    Row 1 (h: auto)  — step 1, →, step 2, →, step 3     (cards)
    Row 2 (h: 60px)  — empty, empty, empty, empty, DOWN  (down arrow in col 5)
    Row 3 (h: auto)  — step 6, ←, step 5, ←, step 4    (cards; col 1=step6 aligns under col1=step1)
  */

  const CARD_H = 200; // px — fixed card height so grid rows are even

  return (
    <>
      <section id={SECTION_IDS.PROCESS} className="relative py-14 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div ref={headerRef} className="text-center mb-16" style={{
            opacity:headerInView?1:0, transform:headerInView?'none':'translateY(24px)',
            transition:'opacity .7s,transform .7s cubic-bezier(.22,1,.36,1)',
          }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-medium tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block"/>
              How I work
            </div>
            <h2 className="syne text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              My Development{' '}
              <span style={{background:'linear-gradient(135deg,#38bdf8,#818cf8,#f472b6)',
                WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                Process
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              From idea to production — how I turn your vision into reliable, scalable software.
            </p>
          </div>

          {/* ══════════════════════════════════════════════════════════
              DESKTOP  — CSS grid snake
              Col template: 1fr 52px 1fr 52px 1fr
              Row 1: [01] [→] [02] [→] [03]
              Row 2: [ ]  [ ]  [ ]  [ ] [↓]   ← down arrow in col 5
              Row 3: [06] [←] [05] [←] [04]
          ══════════════════════════════════════════════════════════ */}
          <div ref={roadRef} className="hidden lg:block mb-24">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 52px 1fr 52px 1fr',
              gridTemplateRows: `${CARD_H}px 60px ${CARD_H}px`,
              gap: 0,
            }}>

              {/* ── ROW 1: steps 01 → 02 → 03 ── */}

              {/* col 1 row 1 — step 01 */}
              <div style={{gridColumn:1,gridRow:1}}>
                <Card step={STEPS[0]} inView={roadInView} delay={.1}
                  hovered={hov===0} onHover={()=>setHov(0)} onLeave={()=>setHov(null)}/>
              </div>

              {/* col 2 row 1 — → arrow */}
              <div style={{gridColumn:2,gridRow:1}}>
                <HArrow fromColor={STEPS[0].to} toColor={STEPS[1].from}
                  dir="right" inView={roadInView} delay={.22}/>
              </div>

              {/* col 3 row 1 — step 02 */}
              <div style={{gridColumn:3,gridRow:1}}>
                <Card step={STEPS[1]} inView={roadInView} delay={.18}
                  hovered={hov===1} onHover={()=>setHov(1)} onLeave={()=>setHov(null)}/>
              </div>

              {/* col 4 row 1 — → arrow */}
              <div style={{gridColumn:4,gridRow:1}}>
                <HArrow fromColor={STEPS[1].to} toColor={STEPS[2].from}
                  dir="right" inView={roadInView} delay={.32}/>
              </div>

              {/* col 5 row 1 — step 03 */}
              <div style={{gridColumn:5,gridRow:1}}>
                <Card step={STEPS[2]} inView={roadInView} delay={.26}
                  hovered={hov===2} onHover={()=>setHov(2)} onLeave={()=>setHov(null)}/>
              </div>

              {/* ── ROW 2: only the DOWN arrow in col 5 ── */}

              {/* col 5 row 2 — ↓ down arrow */}
              <div style={{gridColumn:5,gridRow:2}}>
                <DownArrow fromColor={STEPS[2].to} toColor={STEPS[3].from}
                  inView={roadInView} delay={.42}/>
              </div>

              {/* ── ROW 3: steps 06 ← 05 ← 04  (04 in col5, aligned under 03) ── */}

              {/* col 5 row 3 — step 04 (right-most, directly under step 03) */}
              <div style={{gridColumn:5,gridRow:3}}>
                <Card step={STEPS[3]} inView={roadInView} delay={.5}
                  hovered={hov===3} onHover={()=>setHov(3)} onLeave={()=>setHov(null)}/>
              </div>

              {/* col 4 row 3 — ← arrow */}
              <div style={{gridColumn:4,gridRow:3}}>
                <HArrow fromColor={STEPS[3].to} toColor={STEPS[4].from}
                  dir="left" inView={roadInView} delay={.6}/>
              </div>

              {/* col 3 row 3 — step 05 */}
              <div style={{gridColumn:3,gridRow:3}}>
                <Card step={STEPS[4]} inView={roadInView} delay={.56}
                  hovered={hov===4} onHover={()=>setHov(4)} onLeave={()=>setHov(null)}/>
              </div>

              {/* col 2 row 3 — ← arrow */}
              <div style={{gridColumn:2,gridRow:3}}>
                <HArrow fromColor={STEPS[4].to} toColor={STEPS[5].from}
                  dir="left" inView={roadInView} delay={.68}/>
              </div>

              {/* col 1 row 3 — step 06 */}
              <div style={{gridColumn:1,gridRow:3}}>
                <Card step={STEPS[5]} inView={roadInView} delay={.62}
                  hovered={hov===5} onHover={()=>setHov(5)} onLeave={()=>setHov(null)}/>
              </div>

            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              MOBILE — vertical list, sequential order
          ══════════════════════════════════════════════════════════ */}
          <div className="lg:hidden mb-20">
            {STEPS.map((step, i) => (
              <div key={step.id}>
                <div style={{
                  borderRadius:16, background:'rgba(255,255,255,0.03)',
                  border:'1px solid rgba(255,255,255,0.08)', padding:18,
                  position:'relative', overflow:'hidden',
                  opacity:roadInView?1:0,
                  transform:roadInView?'none':'translateX(-20px)',
                  transition:`opacity .6s ease ${i*.07}s,transform .6s cubic-bezier(.22,1,.36,1) ${i*.07}s`,
                }}>
                  <div style={{position:'absolute',left:0,top:0,bottom:0,width:3,borderRadius:'2px 0 0 2px',
                    background:`linear-gradient(to bottom,${step.from},${step.to})`}}/>
                  <div style={{display:'flex',alignItems:'flex-start',gap:14,paddingLeft:10}}>
                    <div style={{width:44,height:44,borderRadius:11,flexShrink:0,
                      background:`linear-gradient(135deg,${step.from}22,${step.to}22)`,
                      border:`1px solid ${step.from}44`,color:step.from,
                      display:'flex',alignItems:'center',justifyContent:'center'}}>
                      {step.icon}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                        <span style={{fontSize:10,fontWeight:800,opacity:.5,fontFamily:'Syne,sans-serif',
                          background:`linear-gradient(135deg,${step.from},${step.to})`,
                          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{step.id}</span>
                        <h3 style={{fontSize:15,fontWeight:800,margin:0,fontFamily:'Syne,sans-serif',
                          background:`linear-gradient(135deg,${step.from},${step.to})`,
                          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{step.title}</h3>
                        <span style={{fontSize:10,color:'#374151',fontWeight:500}}>· {step.sub}</span>
                      </div>
                      <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                        {step.points.map(p=>(
                          <span key={p} style={{fontSize:11,color:'#4b5563',padding:'3px 9px',borderRadius:99,
                            border:'1px solid rgba(255,255,255,.07)',background:'rgba(255,255,255,.02)',
                            display:'flex',alignItems:'center',gap:4}}>
                            <span style={{color:step.from}}>✓</span>{p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{display:'flex',justifyContent:'flex-start',paddingLeft:36,margin:'4px 0',
                    opacity:roadInView?1:0,transition:`opacity .4s ease ${i*.07+.3}s`}}>
                    <svg viewBox="0 0 20 24" width="14" height="20">
                      <defs>
                        <linearGradient id={`mc${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%"   stopColor={step.to}           stopOpacity=".7"/>
                          <stop offset="100%" stopColor={STEPS[i+1].from}   stopOpacity=".7"/>
                        </linearGradient>
                      </defs>
                      <line x1="10" y1="0" x2="10" y2="17" stroke={`url(#mc${i})`} strokeWidth="1.5" strokeLinecap="round"/>
                      <polyline points="5,12 10,20 15,12" fill="none" stroke={STEPS[i+1].from} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center"
            style={{
              background:'linear-gradient(135deg,#1a2744 0%,#2d1b69 50%,#1a2744 100%)',
              border:'1px solid rgba(255,255,255,.1)',
              opacity:ctaInView?1:0,
              transform:ctaInView?'none':'translateY(24px)',
              transition:'opacity .7s ease .1s,transform .7s cubic-bezier(.22,1,.36,1) .1s',
            }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{background:'linear-gradient(135deg,rgba(56,189,248,.1),rgba(129,140,248,.15),rgba(244,114,182,.08))'}}/>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
              style={{background:'radial-gradient(circle,rgba(129,140,248,.25),transparent 70%)',filter:'blur(40px)'}}/>
            <div className="relative z-10">
              <h3 className="syne text-2xl sm:text-3xl font-black text-white mb-3">Ready to Start Your Project?</h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto text-base leading-relaxed">
                Let's discuss how this proven process can bring your ideas to life with quality, speed, and reliability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={NAV_ANCHORS.CONTACT} className="proc-cta-p inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-sm">
                  <span>Let's Talk</span>
                </a>
                <a href={NAV_ANCHORS.PROJECTS} className="proc-cta-s inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-sm">
                  View My Work
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: `linear-gradient(to top, transparent)` }}/>
      </section>
    </>
  );
}