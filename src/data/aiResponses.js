/**
 * Local portfolio Q&A from portfolioContent.json only.
 * Short, factual replies. No chatbot persona, emojis, or lead-capture flows.
 */

import DATA from './portfolioContent.json';

const personal = DATA.personal;
const skillsCats = DATA.skills.categories;
const experiences = DATA.experience.experiences;
const allProjects = DATA.projects.projects;
const eduDegrees = DATA.education.education;
const certifications = DATA.education.certifications;
const contactInfo = DATA.contact.contactInfo;
const availability = DATA.contact.availability;
const principles = DATA.about.principles || DATA.about.qualities || [];
const currentLearning = DATA.skills.currentlyLearning || [];

let msgIdCounter = 0;

export function resetConversationState() {
  msgIdCounter = 0;
}

function nextId() {
  return `msg_${++msgIdCounter}_${Date.now()}`;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 350 + Math.random() * 450));
}

const b = (text) => `**${text}**`;

function buildGreetingResponse() {
  return `connected to ${personal.brand || 'samir'}.dev. Ask about stack, projects, experience, or how to get in touch.`;
}

function buildAboutResponse() {
  const lines = principles
    .map((q) => `• ${b(q.title)}: ${q.description}`)
    .join('\n');

  return `${personal.bio}

${lines ? `${b('How he works')}\n${lines}\n\n` : ''}Based in ${personal.location}. Currently ${availability.status.toLowerCase()}.`;
}

function buildSkillsResponse() {
  const catLines = skillsCats
    .map((c) => `${b(c.title)}\n  ${c.skills.join(', ')}`)
    .join('\n\n');

  const learning =
    currentLearning.length > 0
      ? `\n\n${b('Currently exploring')}\n${currentLearning.join(', ')}`
      : '';

  return `${catLines}${learning}`;
}

function buildExperienceResponse() {
  const expLines = experiences
    .map((e) => {
      const highlights = (e.achievements || [])
        .slice(0, 2)
        .map((a) => `  - ${a}`)
        .join('\n');
      return `${b(e.title)} · ${e.company}\n  ${e.period} · ${e.location} · ${e.type}\n${highlights}`;
    })
    .join('\n\n');

  return expLines;
}

function buildProjectsResponse(filterTech) {
  let list = allProjects;

  if (filterTech) {
    const techLower = filterTech.toLowerCase();
    list = allProjects.filter((p) =>
      p.technologies.some((t) => t.toLowerCase().includes(techLower))
    );
    if (list.length === 0) {
      return `No projects tagged specifically with ${filterTech}. There are ${allProjects.length} projects total. Ask for the full list, or try another technology.`;
    }
  }

  const projectLines = list
    .map((p) => {
      const techs = p.technologies.slice(0, 4).join(', ');
      const link = p.liveUrl ? `\n  ${p.liveUrl}` : '';
      return `• ${b(p.title)} (${p.category})\n  ${techs}${link}`;
    })
    .join('\n\n');

  const intro = filterTech
    ? `Projects using ${b(filterTech)} (${list.length}):`
    : `Selected work (${list.length}):`;

  return `${intro}\n\n${projectLines}`;
}

function buildTechCountResponse(tech) {
  const matched = allProjects.filter((p) =>
    p.technologies.some((t) => t.toLowerCase().includes(tech.toLowerCase()))
  );

  if (matched.length === 0) {
    return `Nothing tagged with ${tech} in the project list.`;
  }

  return `${matched.length} project${matched.length === 1 ? '' : 's'} with ${b(tech)}:\n\n${matched
    .map((p) => `• ${b(p.title)}`)
    .join('\n')}`;
}

function buildContactResponse() {
  const infoLines = contactInfo.map((c) => `• ${c.label}: ${c.value}`).join('\n');

  return `${infoLines}

${availability.status}. ${availability.description}
Usually replies within 24 hours.`;
}

function buildAvailabilityResponse() {
  return `${availability.status}
${availability.description}

Email: ${personal.email}
LinkedIn: ${personal.linkedin}`;
}

function buildEducationResponse() {
  const degreeLines = eduDegrees
    .map((e) => `• ${b(e.degree)}\n  ${e.institution} · ${e.period}${e.gpa ? ` · GPA ${e.gpa}` : ''}`)
    .join('\n\n');

  const certLines = certifications
    .map((c) => `• ${c.name} (${c.issuer}, ${c.year})`)
    .join('\n');

  return `${b('Education')}\n${degreeLines}\n\n${b('Certifications')}\n${certLines}`;
}

function buildReviewsResponse() {
  const list = DATA.reviews?.reviews || [];
  if (!list.length) {
    return `No written reviews are listed yet. You can also check Upwork: ${DATA.personal?.upwork || 'profile available on request'}.`;
  }

  const lines = list
    .map((r) => {
      const quote = r.feedback ? `\n  "${r.feedback}"` : '';
      return `• ${b(r.name)} (${r.company || 'Upwork'}) · ${r.project || 'Project'} · ${r.date || ''}${quote}`;
    })
    .join('\n\n');

  return `${b('Client reviews')}\n\n${lines}`;
}

function buildResumeResponse() {
  return `Resume: ${personal.resumeUrl || '/resume.pdf'}

Also on LinkedIn: ${personal.linkedin}`;
}

function buildFarewellResponse() {
  return `Thanks for stopping by. Reach Samir at ${personal.email} anytime.`;
}

function buildThanksResponse() {
  return `Glad it helped. Ask about stack, projects, experience, or contact if you need more.`;
}

function buildOffTopicResponse() {
  return `This panel only covers Samir's work: stack, projects, experience, education, and contact.

Try: "what is your stack?", "recent project", or "are you available?"`;
}

function detectIntent(msg) {
  const m = msg.toLowerCase().trim();

  if (/\b(bye|goodbye|see you|take care|that'?s all|cya|later|farewell)\b/.test(m)) {
    return { type: 'farewell' };
  }
  if (/^(thanks|thank you|thx|appreciate it)[\s!?.]*$/i.test(m)) {
    return { type: 'thanks' };
  }
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)[\s!?.]*$/.test(m)) {
    return { type: 'greeting' };
  }
  if (/\b(resume|cv|curriculum)\b/.test(m)) {
    return { type: 'resume' };
  }

  const techCountMatch = m.match(
    /how many\s+(php|laravel|react\.?js?|vue\.?js?|mysql|postgresql|javascript|node\.?js?|mongodb|docker|nuxt|next\.?js?|typescript)\s*(project|app)/
  );
  if (techCountMatch) {
    return { type: 'tech_count', tech: techCountMatch[1] };
  }
  if (/how many (project|app)s?/.test(m)) {
    return { type: 'all_count' };
  }
  if (/\b(skill|technology|tech|stack|framework|tool)\b/.test(m)) {
    return { type: 'skills' };
  }
  if (/\b(experience|work history|career|company|employment|where.*work)\b/.test(m)) {
    return { type: 'experience' };
  }

  const techFilter = m.match(
    /\b(php|laravel|react|vue|mysql|postgresql|javascript|node|mongodb|docker|nuxt|next|typescript)\b.*\bproject|\bproject.*\b(php|laravel|react|vue|mysql|postgresql|javascript|node|mongodb|docker|next|typescript)\b/
  );
  if (techFilter) {
    return { type: 'projects_filter', tech: techFilter[1] || techFilter[2] };
  }
  if (/\b(project|portfolio|built|shipped|showcase)\b/.test(m)) {
    return { type: 'projects' };
  }
  if (/\b(available|availability|freelance|full.?time|open to|for hire)\b/.test(m)) {
    return { type: 'availability' };
  }
  if (/\b(contact|reach|email|phone|hire|linkedin|get in touch)\b/.test(m)) {
    return { type: 'contact' };
  }
  if (/\b(education|degree|university|college|certification|mca|bca)\b/.test(m)) {
    return { type: 'education' };
  }
  if (/\b(review|testimonial|feedback|upwork)\b/.test(m)) {
    return { type: 'reviews' };
  }
  if (/\b(about|who is|background|bio)\b/.test(m) || /\bsamir\b/.test(m)) {
    return { type: 'about' };
  }

  return { type: 'unknown' };
}

export async function getAIResponse(userMessage) {
  await delay();

  const intent = detectIntent(userMessage.trim());
  let responseText = '';
  let isFarewell = false;

  switch (intent.type) {
    case 'greeting':
      responseText = buildGreetingResponse();
      break;
    case 'farewell':
      responseText = buildFarewellResponse();
      isFarewell = true;
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
      responseText = buildProjectsResponse(intent.tech);
      break;
    case 'tech_count':
      responseText = buildTechCountResponse(intent.tech);
      break;
    case 'all_count':
      responseText =
        `${allProjects.length} projects on file:\n\n` +
        allProjects.map((p) => `• ${b(p.title)}`).join('\n');
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

  return {
    id: nextId(),
    type: 'assistant',
    content: responseText,
    timestamp: new Date(),
    isFarewell,
  };
}

export function getInitialMessage() {
  return {
    id: nextId(),
    type: 'assistant',
    content: buildGreetingResponse(),
    timestamp: new Date(),
    isFarewell: false,
  };
}
