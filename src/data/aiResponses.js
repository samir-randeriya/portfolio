/**
 * aiResponses.js — 100% local, zero API calls
 * All responses built dynamically from portfolioContent.json
 * Simulated typing delay for natural UX feel
 * Visitor info collection mid-conversation
 * Farewell detection with personalized goodbye
 */

import DATA from './portfolioContent.json';

// ─── Pre-compute data slices once on import ───────────────────────────────────
const personal       = DATA.personal;
const skillsCats     = DATA.skills.categories;
const experiences    = DATA.experience.experiences;
const allProjects    = DATA.projects.projects;
const eduDegrees     = DATA.education.education;
const certifications = DATA.education.certifications;
const reviews        = DATA.reviews.reviews;
const reviewStats    = DATA.reviews.stats;
const contactInfo    = DATA.contact.contactInfo;
const availability   = DATA.contact.availability;
const qualities      = DATA.about.qualities;
const currentLearning = DATA.skills.currentlyLearning;

// ─── Conversation state (resets per session) ──────────────────────────────────
let messageCount       = 0;
let visitorName        = null;
let visitorRequirement = null;
let askedForName       = false;
let askedForReq        = false;
let infoEmitted        = false;
let awaitingName       = false;
let awaitingReq        = false;
let msgIdCounter       = 0;

export function resetConversationState() {
  messageCount       = 0;
  visitorName        = null;
  visitorRequirement = null;
  askedForName       = false;
  askedForReq        = false;
  infoEmitted        = false;
  awaitingName       = false;
  awaitingReq        = false;
}

export function getVisitorName()        { return visitorName; }
export function getVisitorRequirement() { return visitorRequirement; }

function nextId() {
  return `msg_${++msgIdCounter}_${Date.now()}`;
}

// ─── Simulated thinking delay ─────────────────────────────────────────────────
// Keeps typing indicator visible — feels like a real AI responding
function thinkingDelay() {
  const ms = 700 + Math.random() * 800; // 700–1500ms
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Text helpers ─────────────────────────────────────────────────────────────
const b = (text) => `**${text}**`;

// ─── RESPONSE BUILDERS ────────────────────────────────────────────────────────
// Each builder reads live from the imported JSON — update portfolioContent.json
// and all answers automatically reflect the new data.

function buildGreetingResponse() {
  const greeting = visitorName ? `Hi ${visitorName}! 👋` : `Hi there! 👋`;
  return `${greeting} I'm ${b(personal.name + "'s AI assistant")}.

I have everything you need to know about him his skills, projects, experience, and how to get in touch. No scrolling needed!

${b('Here\'s what I can help with:')}
• Technical skills and full tech stack
• Work experience and career achievements
• Projects from Laravel APIs to React frontends
• Education and certifications
• Client reviews and ratings
• How to contact or hire Samir
• His resume *(just ask!)*

What would you like to know?`;
}

function buildAboutResponse() {
  const bio = personal.bio.replace(/\*\*/g, '');

  const qualityLines = qualities
    .map(q => `• ${q.icon} ${b(q.title)}\n  ${q.description}`)
    .join('\n\n');

  return `Here's the story behind ${b(personal.name)}:

${bio}

${b('What defines him:')}

${qualityLines}

${b('By the numbers:')}
• 4+ years of professional experience
• Senior Lead Software Engineer at Logix Built Solution LTD
• ${allProjects.length}+ projects delivered
• 20+ technologies mastered

Want to dig into his skills or see what he's shipped?`;
}

function buildSkillsResponse() {
  const catLines = skillsCats
    .map(c => `${b(c.title)}\n  ${c.skills.join(', ')}`)
    .join('\n\n');

  return `${b("Samir's complete tech stack")} across ${skillsCats.length} categories:

${catLines}

${b('Proficiency levels:')}
• Expert (95%) — 6 core technologies
• Advanced (85%) — 10 technologies
• Intermediate (70%) — 7 technologies
• Currently Learning — ${currentLearning.join(', ')}

Want to see the projects he's built with these?`;
}

function buildExperienceResponse() {
  const expLines = experiences.map(e => {
    const topAchievements = e.achievements
      .slice(0, 2)
      .map(a => `  → ${a}`)
      .join('\n');
    const techs = e.technologies.slice(0, 6).join(', ');
    return `${b(e.title)}
  ${e.company} · ${e.period} · ${e.type} · ${e.location}
${topAchievements}
  Tech: ${techs}`;
  }).join('\n\n');

  return `${b("Samir's professional experience")} — ${experiences.length} roles:

${expLines}

He's currently ${b('open to new opportunities')} in both freelance and full-time roles.

Want to know about his education or see his project portfolio?`;
}

function buildProjectsResponse(filterTech) {
  let list = allProjects;
  let introLine = `Samir has delivered ${b(allProjects.length + ' projects')} across various domains:`;

  if (filterTech) {
    const techLower = filterTech.toLowerCase();
    list = allProjects.filter(p =>
      p.technologies.some(t => t.toLowerCase().includes(techLower))
    );

    if (list.length === 0) {
      return `I couldn't find projects specifically using ${filterTech}, but Samir has worked across ${allProjects.length} projects with many technologies. Want me to list them all?`;
    }

    const techLabel = filterTech.charAt(0).toUpperCase() + filterTech.slice(1);
    introLine = `Samir has built ${b(list.length + ' projects')} using ${b(techLabel)}:`;
  }

  const projectLines = list.map(p => {
    const techs     = p.technologies.slice(0, 3).join(', ');
    const published = p.metrics.find(m => m.label === 'Published')?.value || '';
    const links     = [
      p.liveUrl   ? `Live: ${p.liveUrl}`   : '',
      p.githubUrl ? `GitHub: ${p.githubUrl}` : '',
    ].filter(Boolean).join(' · ');

    return `• ${b(p.title)}${published ? ' (' + published + ')' : ''}
  ${p.category} · ${techs}${links ? '\n  ' + links : ''}`;
  }).join('\n\n');

  return `${introLine}

${projectLines}

Want details on any specific project or tech stack?`;
}

function buildTechCountResponse(tech) {
  const techLabel   = tech.charAt(0).toUpperCase() + tech.slice(1);
  const matched     = allProjects.filter(p =>
    p.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
  );

  if (matched.length === 0) {
    return `I couldn't find any projects specifically tagged with ${techLabel}. Samir has ${allProjects.length} projects total, want me to list them all?`;
  }

  const projectNames = matched
    .map(p => {
      const published = p.metrics.find(m => m.label === 'Published')?.value || '';
      return `• ${b(p.title)}${published ? ' (' + published + ')' : ''}`;
    })
    .join('\n');

  return `Samir has built ${b(matched.length + ' project' + (matched.length !== 1 ? 's' : ''))} using ${b(techLabel)}:

${projectNames}

Want to see the full tech stack or live links for any of these?`;
}

function buildContactResponse() {
  const infoLines = contactInfo
    .map(c => `• ${b(c.label)}: ${c.value}`)
    .join('\n');

  return `Here's how to reach ${b(personal.name)}:

${infoLines}

${b('Current status:')}
${availability.status} — ${availability.description}

He typically responds within ${b('24 hours')}. Feel free to reach out about freelance projects, full-time opportunities, or collaborations.

Anything else you'd like to know before getting in touch?`;
}

function buildAvailabilityResponse() {
  return `${b(personal.name)} is currently:

${b('✅ ' + availability.status)}
${availability.description}

${b('Reach him directly:')}
• Email: ${personal.email}
• Phone: ${personal.phone}
• LinkedIn: ${personal.linkedin}

He responds within ${b('24 hours')} and is happy to discuss both short-term projects and long-term roles.

Want to see his resume or recent projects first?`;
}

function buildEducationResponse() {
  const degreeLines = eduDegrees
    .map(e => `• ${b(e.degree)}\n  ${e.institution} · ${e.period} · GPA: ${b(e.gpa)}`)
    .join('\n\n');

  const certLines = certifications
    .map(c => `• ${c.name}\n  ${b(c.issuer)} · ${c.year}`)
    .join('\n\n');

  return `${b("Samir's educational background:")}

${b('Academic Degrees:')}
${degreeLines}

${b('Certifications:')}
${certLines}

${b('Currently expanding into:')}
${currentLearning.join(', ')}

His academic foundation combined with hands-on experience makes him a well-rounded engineer. Want to see his work experience or projects?`;
}

function buildReviewsResponse() {
  const statsLine = reviewStats
    .map(s => `${b(s.number)} ${s.label}`)
    .join('  ·  ');

  const reviewLines = reviews
    .filter(r => r.name)
    .map(r => {
      const stars    = '⭐'.repeat(Math.min(r.rating, 5));
      const feedback = r.feedback ? `\n  "${r.feedback}"` : '';
      return `• ${b(r.name)} — ${r.role}, ${r.company}\n  ${stars} · ${r.project} · ${r.date}${feedback}`;
    })
    .join('\n\n');

  return `Here's what clients say about ${b(personal.name)}:

${b('Overall stats:')}
${statsLine}

${b('Client reviews:')}
${reviewLines || '• Reviews are being collected more coming soon!'}

Every review reflects a real project delivered with quality and care. Want to see those projects or get in touch?`;
}

function buildResumeResponse() {
  return `You can download ${b(personal.name + "'s resume")} right here:

[RESUME]

${b('The resume covers:')}
• Complete skill set across ${skillsCats.length} technology categories
• ${experiences.length} professional roles with key achievements
• ${allProjects.length}+ projects with tech stacks and outcomes
• MCA degree (GPA: 9.0) + ${certifications.length} professional certifications

You can also connect on LinkedIn: ${personal.linkedin}

Anything specific you'd like to know about his background?`;
}

function buildFarewellResponse() {
  const namePart = visitorName ? `, ${visitorName}` : '';
  const reqPart  = visitorRequirement
    ? `\n\nSamir will make sure to reach out to you about ${b(visitorRequirement)} very soon.`
    : '';

  return `It was great chatting with you${namePart}! 👋${reqPart}

${b('Reach Samir directly anytime:')}
• Email: ${personal.email}
• Phone: ${personal.phone}
• LinkedIn: ${personal.linkedin}

Hope to see something amazing get built together. Take care and have a great day! 🚀`;
}

function buildThanksResponse() {
  const name = visitorName ? `, ${visitorName}` : '';
  return `You're very welcome${name}! 😊

Happy to help you learn about Samir's portfolio. Feel free to ask anything else about his work, skills, projects, experience, or how to get in touch!`;
}

function buildOffTopicResponse() {
  return `I'm Samir's portfolio assistant, so I only know about his work and background. I can't help with that specific topic.

${b('But I can tell you about:')}
• ${b('His skills')} — Laravel, React, Vue, PHP, and more
• ${b('His projects')} — ${allProjects.length} real-world applications
• ${b('His experience')} — 4+ years as Senior Lead Software Engineer
• ${b('How to hire him')} — availability, contact details, and resume

What would you like to explore?`;
}

// ─── INTENT DETECTION ─────────────────────────────────────────────────────────
function detectIntent(msg) {
  const m = msg.toLowerCase().trim();

  // Farewell — check first so "thanks and bye" resolves correctly
  if (/\b(bye|goodbye|see you|take care|thanks for now|that'?s all|done here|cya|later|signing off|farewell|good night|gotta go|all good|i'?m done|cheers)\b/.test(m)) {
    return { type: 'farewell' };
  }

  // Thanks
  if (/\b(thank|thanks|thx|appreciate|helpful|great answer|awesome|perfect|well done|good job|nice one|love it|brilliant|fantastic)\b/.test(m)) {
    return { type: 'thanks' };
  }

  // Greeting — short greetings only
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|sup|yo|hola|greetings|what'?s up|howdy|namaste)[\s!?.]*$/.test(m)) {
    return { type: 'greeting' };
  }

  // Resume / CV
  if (/\b(resume|cv|curriculum vitae|download|pdf)\b/.test(m)) {
    return { type: 'resume' };
  }

  // Specific tech count — "how many php projects"
  const techCountMatch = m.match(
    /how many\s+(php|laravel|react\.?js?|vue\.?js?|mysql|postgresql|javascript|node\.?js?|mongodb|docker|nuxt|next\.?js?|typescript)\s*(project|app|work|thing)/
  );
  if (techCountMatch) {
    return { type: 'tech_count', tech: techCountMatch[1] };
  }

  // All project count
  if (/how many (project|app|thing|work)s?/.test(m)) {
    return { type: 'all_count' };
  }

  // Skills
  if (/\b(skill|technology|tech|stack|expertise|proficien|know|language|framework|tool|capabilit|what can you|what do you know|what does he know|what does samir know)\b/.test(m)) {
    return { type: 'skills' };
  }

  // Experience / work history
  if (/\b(experience|work history|job|career|company|role|position|employment|professional|history|where.*work|past.*work|current.*job)\b/.test(m)) {
    return { type: 'experience' };
  }

  // Projects filtered by tech
  const techFilter = m.match(
    /\b(php|laravel|react|vue|mysql|postgresql|javascript|node|mongodb|docker|nuxt|next|typescript)\b.*\bproject|\bproject.*\b(php|laravel|react|vue|mysql|postgresql|javascript|node|mongodb|docker)\b/
  );
  if (techFilter) {
    const tech = techFilter[1] || techFilter[2];
    return { type: 'projects_filter', tech };
  }

  // Projects — general
  if (/\b(project|portfolio|build|built|developed|created|application|app|made|shipped|what.*built|show.*work|showcase)\b/.test(m)) {
    return { type: 'projects' };
  }

  // Contact / hire
  if (/\b(contact|reach|email|phone|hire|connect|message|linkedin|whatsapp|get in touch|work with|collaborate|reach out|talk to|speak to)\b/.test(m)) {
    return { type: 'contact' };
  }

  // Availability
  if (/\b(available|availability|open to|freelance|full.?time|opportunity|open for work|looking for|accepting)\b/.test(m)) {
    return { type: 'availability' };
  }

  // Education
  if (/\b(education|degree|study|university|college|qualification|certification|course|mca|bca|learning|school|academic|gpa|grade|graduate|diploma)\b/.test(m)) {
    return { type: 'education' };
  }

  // Reviews
  if (/\b(review|rating|client|testimonial|feedback|recommend|satisfaction|upwork|customer|star|review)\b/.test(m)) {
    return { type: 'reviews' };
  }

  // About / who is Samir
  if (/\b(about|who|who is|tell me|introduce|yourself|samir|person|developer|engineer|background|story)\b/.test(m)) {
    return { type: 'about' };
  }

  return { type: 'unknown' };
}

// ─── VISITOR INFO INJECTION ────────────────────────────────────────────────────
function injectVisitorQuestions(text, intentType) {
  let result        = text;
  let infoCollected = null;

  // Ask for name after 3rd exchange (not on greetings or farewells)
  if (
    messageCount >= 3 &&
    !askedForName &&
    intentType !== 'farewell' &&
    intentType !== 'greeting'
  ) {
    result      += `\n\nBy the way, I'd love to know who I'm chatting with what's your name? 😊`;
    askedForName = true;
    awaitingName = true;
  }

  // Ask for requirement after name is known and 5+ messages
  if (
    visitorName &&
    messageCount >= 5 &&
    !askedForReq &&
    intentType !== 'farewell'
  ) {
    result     += `\n\nBy the way ${visitorName}, what brings you here today are you looking to hire Samir for a ${b('freelance project')}, a ${b('full-time role')}, or something else?`;
    askedForReq = true;
    awaitingReq = true;
  }

  // Emit VISITOR_INFO marker once both name + requirement are known
  if (visitorName && visitorRequirement && !infoEmitted) {
    infoEmitted   = true;
    infoCollected = `Got it! Samir will reach out to ${b(visitorName)} about: ${visitorRequirement}`;
    result       += `\nVISITOR_INFO:{"name":"${visitorName}","requirement":"${visitorRequirement}"}`;
  }

  return { text: result, infoCollected };
}

// ─── TRY TO CAPTURE VISITOR NAME OR REQUIREMENT ───────────────────────────────
function tryCaptureInfo(msg) {
  // Name capture — runs when we're awaiting a name reply
  if (awaitingName && !visitorName) {
    const cleaned = msg.trim().replace(/[^a-zA-Z\s'-]/g, '').trim();
    const words   = cleaned.split(/\s+/).filter(Boolean);
    // Treat as a name if it's 1–4 words with no intent keywords
    const hasIntentKeywords = /\b(skill|project|experience|contact|resume|education|review|hire|about|who|how|what|tell|show)\b/i.test(msg);
    if (words.length >= 1 && words.length <= 4 && !hasIntentKeywords && cleaned.length > 1) {
      visitorName = words
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
      awaitingName = false;
      return 'name_captured';
    }
  }

  // Requirement capture — runs when we're awaiting a requirement reply
  if (awaitingReq && !visitorRequirement) {
    const reqPattern = /\b(freelance|full.?time|contract|project|collaborat|help|work|opportunity|hire|part.?time|consult|internship|remote)\b/i;
    if (reqPattern.test(msg)) {
      visitorRequirement = msg.trim();
      awaitingReq        = false;
      return 'req_captured';
    }
  }

  return null;
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export async function getAIResponse(userMessage, conversationHistory) {
  messageCount++;

  // Simulated typing delay — makes the typing indicator visible and feels natural
  await thinkingDelay();

  const msg     = userMessage.trim();
  const mLower  = msg.toLowerCase();

  // First check if this message is a visitor info capture reply
  const captured = tryCaptureInfo(msg);

  let responseText  = '';
  let isFarewell    = false;
  let infoCollected = null;

  if (captured === 'name_captured') {
    // Acknowledge the name warmly
    responseText = `Nice to meet you, ${b(visitorName)}! 😊 Great to have you here.

Is there something specific you'd like to know Samir's skills, projects, experience, or how to get in touch?`;

  } else if (captured === 'req_captured') {
    // Acknowledge the requirement
    responseText = `Perfect, ${visitorName}! Samir will be in touch about ${b(visitorRequirement)} soon.

In the meantime, feel free to ask me anything else about his work!`;

  } else {
    // Detect intent and build the appropriate response
    const intentObj  = detectIntent(mLower);
    const intentType = intentObj.type;
    const tech       = intentObj.tech || null;

    switch (intentType) {
      case 'greeting':
        responseText = buildGreetingResponse();
        break;

      case 'farewell':
        responseText = buildFarewellResponse();
        isFarewell   = true;
        break;

      case 'thanks':
        responseText = buildThanksResponse();
        break;

      case 'about':
        responseText = buildAboutResponse();
        break;

      case 'skills':
        responseText = buildSkillsResponse();
        break;

      case 'experience':
        responseText = buildExperienceResponse();
        break;

      case 'projects':
        responseText = buildProjectsResponse();
        break;

      case 'projects_filter':
        responseText = buildProjectsResponse(tech);
        break;

      case 'tech_count':
        responseText = buildTechCountResponse(tech);
        break;

      case 'all_count':
        responseText = `Samir has delivered a total of ${b(allProjects.length + ' projects')}:\n\n` +
          allProjects.map(p => `• ${b(p.title)}`).join('\n') +
          `\n\nWant details on any specific project, or see them filtered by technology?`;
        break;

      case 'contact':
        responseText = buildContactResponse();
        break;

      case 'availability':
        responseText = buildAvailabilityResponse();
        break;

      case 'education':
        responseText = buildEducationResponse();
        break;

      case 'reviews':
        responseText = buildReviewsResponse();
        break;

      case 'resume':
        responseText = buildResumeResponse();
        break;

      default:
        responseText = buildOffTopicResponse();
        break;
    }

    // Inject name/requirement questions + VISITOR_INFO marker if applicable
    if (!isFarewell) {
      const injected = injectVisitorQuestions(responseText, intentType);
      responseText   = injected.text;
      infoCollected  = injected.infoCollected;
    }
  }

  // Strip VISITOR_INFO marker from visible content and parse it
  const infoMatch = responseText.match(/VISITOR_INFO:\{"name":"([^"]+)","requirement":"([^"]+)"\}/);
  if (infoMatch) {
    responseText = responseText.replace(/VISITOR_INFO:\{[^}]+\}\n?/, '').trim();
    if (!infoCollected) {
      infoCollected = `Got it! Samir will reach out to ${b(infoMatch[1])} about: ${infoMatch[2]}`;
    }
  }

  return {
    id:            nextId(),
    type:          'assistant',
    content:       responseText,
    timestamp:     new Date(),
    infoCollected: infoCollected,
    isFarewell:    isFarewell,
  };
}

// ─── INITIAL MESSAGE ──────────────────────────────────────────────────────────
export function getInitialMessage() {
  return {
    id:            nextId(),
    type:          'assistant',
    content:       buildGreetingResponse(),
    timestamp:     new Date(),
    infoCollected: null,
    isFarewell:    false,
  };
}