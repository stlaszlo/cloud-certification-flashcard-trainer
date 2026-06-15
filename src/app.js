import { exams } from "./exams/index.js";
import { serviceAtlases } from "./services/index.js";

const app = document.querySelector("#app");
const state = {
  view: "home", exam: null, mode: "simulation", questions: [], current: 0,
  answers: {}, flagged: new Set(), remaining: 0, timer: null, startedAt: null,
  atlas: serviceAtlases[0], selectedDomain: serviceAtlases[0].domains[0].id, selectedService: serviceAtlases[0].domains[0].services[0].id, selectedComparison: null
};

const shuffle = (items) => {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
};
const prepareQuestion = (question) => ({ ...question, options: shuffle(question.options) });
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" })[c]);
const formatTime = (seconds) => `${String(Math.floor(seconds / 3600)).padStart(2,"0")}:${String(Math.floor(seconds % 3600 / 60)).padStart(2,"0")}:${String(seconds % 60).padStart(2,"0")}`;
const answerIsCorrect = (question, answer = []) => question.correct.length === answer.length && question.correct.every(id => answer.includes(id));
const currentQuestion = () => state.questions[state.current];
const answerText = (question, ids = []) => ids.length ? ids.map(id => question.options.find(o => o.id === id)?.text).join("; ") : "No answer";
const activeQuestionCount = (exam) => exam.questions.filter(question => question.difficulty !== "hardcore-legacy").length;

function home() {
  state.view = "home";
  clearInterval(state.timer);
  app.innerHTML = `<div class="shell">
    <header class="topbar"><div class="brand"><span class="brand-mark">C</span> Cloud Architect Exam Lab</div><button class="btn btn-secondary" id="open-atlas">Service atlas</button></header>
    <main class="container">
      <section class="hero">
        <div><p class="eyebrow">Architecture under pressure</p><h1>Practice the decisions, not the trivia.</h1><p class="lead">Realistic, timed cloud certification simulations with scenario trade-offs, case studies, review flags, and domain-level feedback.</p></div>
        <aside class="hero-card"><div class="stat"><span>Provider-ready design</span><strong>3+</strong></div><div class="stat"><span>Original questions</span><strong>${exams.reduce((n,e)=>n+activeQuestionCount(e),0)}</strong></div><div class="stat"><span>Runs fully local</span><strong>100%</strong></div></aside>
      </section>
      <section><p class="eyebrow">Available exams</p><div class="cards">${exams.map(examCard).join("")}</div></section>
      <section style="margin-top:28px"><article class="card"><div class="card-body"><span class="tag">Study mode</span><h2>Hyperscaler service atlas</h2><p>Browse major cloud services by domain, learn what they are for, and compare when to use each one. Starts with GCP and is shaped for AWS and Azure later.</p><button class="btn btn-primary" id="atlas-card">Open service atlas</button></div></article></section>
      <p class="footer-note">Independent practice tool. Not affiliated with Google, Amazon, or Microsoft. No real exam questions are included.</p>
    </main></div>`;
  app.querySelectorAll("[data-exam]").forEach(button => button.addEventListener("click", () => setup(button.dataset.exam)));
  app.querySelector("#open-atlas").addEventListener("click", renderServiceAtlas);
  app.querySelector("#atlas-card").addEventListener("click", renderServiceAtlas);
}

function examCard(exam) {
  return `<article class="card"><div class="card-accent" style="background:${exam.color}"></div><div class="card-body">
    <span class="tag">${escapeHtml(exam.provider)} · ${escapeHtml(exam.certification)}</span><h2>${escapeHtml(exam.title)}</h2><p>${escapeHtml(exam.description)}</p>
    <div class="meta"><span>${activeQuestionCount(exam)} questions</span><span>${exam.caseStudies.length} case studies</span></div>
    <button class="btn btn-primary" data-exam="${exam.id}">Configure session</button>
  </div></article>`;
}

function setup(id) {
  state.exam = exams.find(e => e.id === id);
  const standardCount = state.exam.questions.filter(q => !q.difficulty).length;
  const expandedCount = state.exam.questions.filter(q => q.difficulty === "advanced").length;
  state.view = "setup";
  app.innerHTML = `<div class="shell"><header class="topbar"><button class="btn btn-secondary" id="back">← Exams</button><div class="brand">${escapeHtml(state.exam.provider)} · ${escapeHtml(state.exam.title)}</div><span class="tag">${escapeHtml(state.exam.code)}</span></header>
  <main class="container"><p class="eyebrow">Session setup</p><h1 style="font-size:clamp(2rem,5vw,3.7rem)">Choose your pressure level.</h1>
  <div class="mode-grid">
    ${mode("simulation","Condensed simulation",`${standardCount} questions · ${Math.round(state.exam.durationMinutes * standardCount / 55)} minutes · feedback after submission`)}
    ${mode("quick","Quick drill","10 mixed questions · 20 minutes · ideal for a short session")}
    ${mode("case","Case study sprint","Case-study questions only · split-screen scenarios")}
    ${mode("hardcore","Hardcore architect","20 adversarial scenarios · 45 minutes · best-answer trade-offs")}
    ${mode("expanded","Expanded challenge",`${expandedCount} contributed scenarios · broad technical coverage`)}
  </div>
  <div class="notice"><strong>Official format:</strong> ${state.exam.durationMinutes / 60} hours, ${state.exam.officialQuestionRange} multiple-choice and multiple-select questions. Two case studies make up 20–30% of the standard exam.</div>
  <p class="lead" style="margin-top:20px">${escapeHtml(state.exam.note)}</p>
  <h3>Blueprint represented</h3><div class="cards">${state.exam.domains.map(d => `<div class="card"><div class="card-body"><strong>${escapeHtml(d.name)}</strong><div class="meta">${d.weight}% of official exam</div></div></div>`).join("")}</div>
  <button class="btn btn-primary" id="start" style="margin-top:28px">Start session</button></main></div>`;
  app.querySelector("#back").addEventListener("click", home);
  app.querySelectorAll("[data-mode]").forEach(el => el.addEventListener("click", () => { state.mode = el.dataset.mode; setup(id); }));
  app.querySelector("#start").addEventListener("click", start);
}

function mode(id, title, detail) {
  return `<button class="mode ${state.mode === id ? "selected" : ""}" data-mode="${id}"><strong>${title}</strong><span>${detail}</span></button>`;
}

function start() {
  const standard = state.exam.questions.filter(q => !q.difficulty);
  const advanced = state.exam.questions.filter(q => q.difficulty === "advanced");
  const pool = state.mode === "hardcore" ? state.exam.questions.filter(q => q.difficulty === "hardcore") : state.mode === "expanded" ? advanced : state.mode === "case" ? standard.filter(q => q.caseStudy) : state.mode === "quick" ? [...standard, ...advanced] : standard;
  const count = state.mode === "quick" ? Math.min(10, pool.length) : state.mode === "hardcore" ? Math.min(20, pool.length) : pool.length;
  state.questions = shuffle(pool).slice(0, count).map(prepareQuestion);
  state.answers = {};
  state.flagged = new Set();
  state.current = 0;
  state.startedAt = Date.now();
  state.remaining = state.mode === "quick" ? 20 * 60 : state.mode === "hardcore" ? 45 * 60 : state.mode === "expanded" ? 100 * 60 : Math.round(state.exam.durationMinutes * count / 55) * 60;
  state.view = "exam";
  state.timer = setInterval(() => {
    state.remaining -= 1;
    const timer = document.querySelector("#timer");
    if (timer) timer.textContent = formatTime(Math.max(0, state.remaining));
    if (state.remaining <= 0) submit();
  }, 1000);
  renderExam();
}

function renderExam() {
  const question = currentQuestion();
  const caseStudy = question.caseStudy && state.exam.caseStudies.find(c => c.id === question.caseStudy);
  const selected = state.answers[question.id] || [];
  app.innerHTML = `<div class="shell">
    <header class="exam-head"><div class="exam-title"><strong>${state.mode === "hardcore" ? "Hardcore · " : ""}${escapeHtml(state.exam.code)} Practice Session</strong></div><div class="timer" id="timer">${formatTime(state.remaining)}</div><div class="head-actions"><button class="btn btn-secondary" id="flag">${state.flagged.has(question.id) ? "Unflag" : "Flag for review"}</button><button class="btn btn-danger" id="submit">Submit</button></div></header>
    <div class="progress"><div style="width:${(state.current + 1) / state.questions.length * 100}%"></div></div>
    <main class="exam-layout ${caseStudy ? "with-case" : ""}">
      <article class="question-card"><div class="question-number">Question ${state.current + 1} of ${state.questions.length} · ${escapeHtml(state.exam.domains.find(d=>d.id===question.domain)?.name || question.domain)}</div>
      <h2 class="question-title">${escapeHtml(question.prompt)}</h2><p class="instruction">${question.type === "multiple" ? `Select ${question.correct.length} answers.` : "Select one answer."}</p>
      <form id="answer-form">${question.options.map(o => `<label class="option"><input type="${question.type === "multiple" ? "checkbox" : "radio"}" name="answer" value="${o.id}" ${selected.includes(o.id) ? "checked" : ""}><span>${escapeHtml(o.text)}</span></label>`).join("")}</form>
      <div class="question-actions"><button class="btn btn-secondary" id="previous" ${state.current === 0 ? "disabled" : ""}>← Previous</button><button class="btn btn-primary" id="next">${state.current === state.questions.length - 1 ? "Review & submit" : "Next →"}</button></div></article>
      ${caseStudy ? casePanel(caseStudy) : ""}
      ${palette()}
    </main></div>`;
  wireExam();
}

function casePanel(c) {
  return `<aside class="case-panel"><p class="eyebrow">Case study</p><h3>${escapeHtml(c.name)}</h3><p class="meta">${escapeHtml(c.industry)}</p><p>${escapeHtml(c.summary)}</p><h4>Requirements</h4><ul>${c.requirements.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul><h4>Constraints</h4><ul>${c.constraints.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul></aside>`;
}

function palette() {
  return `<aside class="palette"><strong>Question navigator</strong><div class="palette-grid">${state.questions.map((q,i)=>`<button data-go="${i}" class="${i===state.current?"current":""} ${state.answers[q.id]?.length?"answered":""} ${state.flagged.has(q.id)?"flagged":""}">${i+1}</button>`).join("")}</div><p class="legend">Green: answered · amber bar: flagged</p><button class="btn btn-primary" id="review">Review & submit</button></aside>`;
}

function saveAnswer() {
  state.answers[currentQuestion().id] = [...document.querySelectorAll('input[name="answer"]:checked')].map(el => el.value);
}

function wireExam() {
  document.querySelector("#answer-form").addEventListener("change", saveAnswer);
  document.querySelector("#previous").addEventListener("click", () => { saveAnswer(); state.current--; renderExam(); });
  document.querySelector("#next").addEventListener("click", () => { saveAnswer(); if (state.current < state.questions.length - 1) { state.current++; renderExam(); } else review(); });
  document.querySelector("#flag").addEventListener("click", () => { const id=currentQuestion().id; state.flagged.has(id)?state.flagged.delete(id):state.flagged.add(id); renderExam(); });
  document.querySelector("#submit").addEventListener("click", review);
  document.querySelector("#review").addEventListener("click", review);
  document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => { saveAnswer(); state.current=Number(b.dataset.go); renderExam(); }));
}

function review() {
  saveAnswer();
  const unanswered = state.questions.filter(q => !state.answers[q.id]?.length).length;
  app.innerHTML = `<div class="shell"><header class="topbar"><div class="brand">Review session</div><span class="timer">${formatTime(state.remaining)}</span></header><main class="container"><p class="eyebrow">Before you submit</p><h1 style="font-size:3rem">Check your work.</h1>
  <div class="hero-card"><div class="stat"><span>Answered</span><strong>${state.questions.length-unanswered}/${state.questions.length}</strong></div><div class="stat"><span>Unanswered</span><strong>${unanswered}</strong></div><div class="stat"><span>Flagged</span><strong>${state.flagged.size}</strong></div></div>
  <div style="display:flex;gap:12px;margin-top:24px"><button class="btn btn-secondary" id="return">Return to questions</button><button class="btn btn-primary" id="confirm">Submit and score</button></div></main></div>`;
  document.querySelector("#return").addEventListener("click", renderExam);
  document.querySelector("#confirm").addEventListener("click", submit);
}

function submit() {
  clearInterval(state.timer);
  const correct = state.questions.filter(q => answerIsCorrect(q, state.answers[q.id])).length;
  const score = Math.round(correct / state.questions.length * 100);
  const elapsed = Math.round((Date.now() - state.startedAt) / 60000);
  const domainStats = state.exam.domains.map(d => {
    const qs = state.questions.filter(q=>q.domain===d.id);
    const right = qs.filter(q=>answerIsCorrect(q,state.answers[q.id])).length;
    return { ...d, total: qs.length, right, pct: qs.length ? Math.round(right/qs.length*100) : 0 };
  }).filter(d=>d.total);
  app.innerHTML = `<div class="shell"><header class="topbar"><div class="brand"><span class="brand-mark">C</span> Session results</div><button class="btn btn-secondary" id="home">Exit</button></header>
  <main class="container"><div class="results-grid"><section class="results-card"><p class="eyebrow">Your result</p><div class="score ${score>=70?"good":"needs-work"}">${score}%</div><p>${correct} of ${state.questions.length} correct · ${elapsed} min</p><div class="notice">Google does not publish a passing score. Use this score to identify weak domains, not as a prediction of the official result.</div><button class="btn btn-primary" id="retry" style="margin-top:20px">New session</button></section>
  <section class="results-card"><h2>Domain performance</h2>${domainStats.map(d=>`<div class="domain-row"><span>${escapeHtml(d.name)}</span><strong class="${d.pct>=70?"correct":"incorrect"}">${d.right}/${d.total} · ${d.pct}%</strong></div>`).join("")}</section></div>
  <section class="coach-card" id="coach"><div class="coach-head"><div><p class="eyebrow">Local AI architecture trainer</p><h2>Building your personalized debrief…</h2></div><span class="tag">llama3.1:8b</span></div><p class="coach-status"><span class="spinner"></span>Reviewing your decisions and exam-domain patterns locally.</p></section>
  <section class="results-card" style="margin-top:24px"><h2>Answer review</h2>${state.questions.map(reviewItem).join("")}</section></main></div>`;
  document.querySelector("#home").addEventListener("click", home);
  document.querySelector("#retry").addEventListener("click", () => setup(state.exam.id));
  requestCoach({ score, correct, elapsed, domainStats });
}

function reviewItem(question, index) {
  const answer = state.answers[question.id] || [];
  const correct = answerIsCorrect(question, answer);
  return `<article class="review-item"><p class="${correct?"correct":"incorrect"}"><strong>${correct?"Correct":"Needs review"} · Question ${index+1}</strong></p><h3>${escapeHtml(question.prompt)}</h3><p class="answer-line"><strong>Your answer:</strong> ${escapeHtml(answerText(question, answer))}</p>${correct?"":`<p class="answer-line"><strong>Best answer:</strong> ${escapeHtml(answerText(question, question.correct))}</p>`}<p>${escapeHtml(question.explanation)}</p><span class="tag">${escapeHtml(question.objective)}</span></article>`;
}

async function requestCoach(result) {
  const coach = document.querySelector("#coach");
  const mistakes = state.questions.filter(question => !answerIsCorrect(question, state.answers[question.id])).map(question => ({
    domain: state.exam.domains.find(domain => domain.id === question.domain)?.name || question.domain,
    objective: question.objective,
    question: question.prompt,
    learnerAnswer: answerText(question, state.answers[question.id]),
    bestAnswer: answerText(question, question.correct),
    rationale: question.explanation,
    caseStudy: question.caseStudy ? state.exam.caseStudies.find(c => c.id === question.caseStudy)?.name : null
  }));
  const session = {
    exam: `${state.exam.provider} ${state.exam.title}`,
    mode: state.mode,
    score: `${result.score}% (${result.correct}/${state.questions.length})`,
    elapsedMinutes: result.elapsed,
    domainPerformance: result.domainStats.map(d => `${d.name}: ${d.right}/${d.total} (${d.pct}%)`),
    mistakes
  };
  const prompt = `You are Atlas, a helpful, supportive, and direct senior cloud architecture trainer preparing a learner for the ${session.exam} exam.
Analyze the completed practice session below. Focus on architectural reasoning, trade-offs, requirement keywords, and recurring decision mistakes. Treat unanswered questions as an exam-technique or time-management signal, not proof that the learner lacks the relevant knowledge. Keep criticism constructive and specific. Do not claim this score predicts the official exam.

Return JSON only with exactly this shape:
{
  "headline": "one concise assessment",
  "summary": "2-3 sentences describing strengths and the most important weakness",
  "mistakePatterns": ["3-5 concise patterns, each explaining why the learner's reasoning failed"],
  "studyAreas": [{"area":"specific exam topic","priority":"High|Medium|Low","why":"why this matters based on the session","actions":["2 concrete study or practice actions"]}],
  "examTechnique": ["2-4 practical exam-taking recommendations grounded in this session"],
  "encouragement": "one grounded closing sentence"
}

SESSION:
${JSON.stringify(session)}`;
  try {
    const response = await fetch("/ollama/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1:8b",
        prompt,
        stream: false,
        format: "json",
        options: { temperature: 0.25, num_predict: 1200 }
      })
    });
    if (!response.ok) throw new Error(`Ollama returned ${response.status}`);
    const payload = await response.json();
    renderCoach(JSON.parse(payload.response));
  } catch (error) {
    if (!coach) return;
    coach.classList.add("coach-error");
    coach.innerHTML = `<div class="coach-head"><div><p class="eyebrow">Local AI architecture trainer</p><h2>Your debrief is temporarily unavailable.</h2></div><span class="tag">Ollama offline</span></div><p>Start Ollama with <code>ollama run llama3.1:8b</code>, then use the button below. Your standard answer review is still available.</p><button class="btn btn-secondary" id="coach-retry">Retry AI debrief</button>`;
    document.querySelector("#coach-retry").addEventListener("click", () => {
      coach.classList.remove("coach-error");
      coach.innerHTML = `<div class="coach-head"><div><p class="eyebrow">Local AI architecture trainer</p><h2>Building your personalized debrief…</h2></div><span class="tag">llama3.1:8b</span></div><p class="coach-status"><span class="spinner"></span>Reviewing your decisions and exam-domain patterns locally.</p>`;
      requestCoach(result);
    });
  }
}

function renderCoach(review) {
  const coach = document.querySelector("#coach");
  if (!coach) return;
  const list = items => `<ul>${(Array.isArray(items) ? items : []).map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  const areas = Array.isArray(review.studyAreas) ? review.studyAreas : [];
  coach.innerHTML = `<div class="coach-head"><div><p class="eyebrow">Atlas · Local AI architecture trainer</p><h2>${escapeHtml(review.headline || "Your personalized debrief")}</h2></div><span class="tag">llama3.1:8b · local</span></div>
  <p>${escapeHtml(review.summary || "")}</p>
  <div class="coach-grid">
    <section class="coach-section"><h3>Mistake patterns</h3>${list(review.mistakePatterns)}</section>
    <section class="coach-section"><h3>Exam technique</h3>${list(review.examTechnique)}</section>
  </div>
  <h3 style="margin-top:24px">Recommended study areas</h3>
  <div class="cards">${areas.map(area => `<article class="coach-section"><span class="tag">${escapeHtml(area.priority || "Priority")}</span><h3>${escapeHtml(area.area || "Study area")}</h3><p>${escapeHtml(area.why || "")}</p>${list(area.actions)}</article>`).join("")}</div>
  <p style="margin-top:22px"><strong>${escapeHtml(review.encouragement || "")}</strong></p>`;
}

const allServices = () => state.atlas.domains.flatMap(domain => domain.services.map(service => ({ ...service, domainName: domain.name })));
const selectedDomain = () => state.atlas.domains.find(domain => domain.id === state.selectedDomain) || state.atlas.domains[0];
const selectedService = () => allServices().find(service => service.id === state.selectedService) || selectedDomain().services[0];

function renderServiceAtlas() {
  clearInterval(state.timer);
  const domain = selectedDomain();
  const service = selectedService();
  const comparison = state.selectedComparison ? state.atlas.comparisons.find(item => item.id === state.selectedComparison) : null;
  app.innerHTML = `<div class="shell">
    <header class="topbar"><button class="btn btn-secondary" id="atlas-back">← Exams</button><div class="brand"><span class="brand-mark">S</span>${escapeHtml(state.atlas.provider)} Service Atlas</div><span class="tag">local tutor</span></header>
    <main class="atlas-layout">
      <aside class="atlas-sidebar"><p class="eyebrow">Domains</p>${state.atlas.domains.map(item => `<button class="atlas-domain ${item.id === state.selectedDomain ? "selected" : ""}" data-domain="${item.id}"><strong>${escapeHtml(item.name)}</strong><span>${item.services.length} services</span></button>`).join("")}</aside>
      <section class="atlas-main">
        <div class="atlas-hero"><p class="eyebrow">${escapeHtml(domain.name)}</p><h1>Know the tool, then choose the architecture.</h1><p>${escapeHtml(domain.summary)}</p></div>
        <div class="service-grid">${domain.services.map(item => serviceButton(item)).join("")}</div>
        <section class="comparison-strip"><h2>Use-Case Comparisons</h2><div class="comparison-buttons">${state.atlas.comparisons.map(item => `<button class="comparison-chip ${item.id === state.selectedComparison ? "selected" : ""}" data-comparison="${item.id}">${escapeHtml(item.title)}</button>`).join("")}</div></section>
        <section class="atlas-detail">${comparison ? comparisonPanel(comparison) : servicePanel(service)}</section>
      </section>
    </main>
  </div>`;
  document.querySelector("#atlas-back").addEventListener("click", home);
  document.querySelectorAll("[data-domain]").forEach(button => button.addEventListener("click", () => {
    state.selectedDomain = button.dataset.domain;
    state.selectedService = selectedDomain().services[0].id;
    state.selectedComparison = null;
    renderServiceAtlas();
  }));
  document.querySelectorAll("[data-service]").forEach(button => button.addEventListener("click", () => {
    state.selectedService = button.dataset.service;
    state.selectedComparison = null;
    renderServiceAtlas();
  }));
  document.querySelectorAll("[data-comparison]").forEach(button => button.addEventListener("click", () => {
    state.selectedComparison = button.dataset.comparison;
    renderServiceAtlas();
  }));
  document.querySelector("#atlas-tutor").addEventListener("click", requestServiceTutor);
}

function serviceButton(service) {
  return `<button class="service-card ${service.id === state.selectedService && !state.selectedComparison ? "selected" : ""}" data-service="${service.id}"><strong>${escapeHtml(service.name)}</strong><span>${escapeHtml(service.purpose)}</span></button>`;
}

function servicePanel(service) {
  return `<div class="detail-card"><p class="eyebrow">${escapeHtml(service.domainName)}</p><h2>${escapeHtml(service.name)}</h2><p>${escapeHtml(service.purpose)}</p>
    <div class="detail-list-grid">
    ${service.unique ? `<section><h3>What Makes It Unique</h3><p>${escapeHtml(service.unique)}</p></section>` : ""}
    ${service.equivalents ? `<section><h3>Rough AWS/Azure Match</h3><p><strong>AWS:</strong> ${escapeHtml(service.equivalents.aws || "No close single-service match")}</p><p><strong>Azure:</strong> ${escapeHtml(service.equivalents.azure || "No close single-service match")}</p></section>` : ""}
    ${detailList("Key Characteristics", service.characteristics)}
    ${detailList("Use When", service.useWhen)}
    ${detailList("Avoid When", service.avoidWhen)}
    ${detailList("Exam Signals", service.examSignals)}
    </div>
    <div class="detail-actions"><a class="btn btn-secondary" href="${escapeHtml(service.docs)}" target="_blank" rel="noreferrer">Open docs</a><button class="btn btn-primary" id="atlas-tutor">Ask Atlas to tutor me</button></div>
    <section class="coach-section" id="service-tutor"><p class="coach-status">Atlas can turn this into a quick study explanation using local Ollama.</p></section></div>`;
}

function comparisonPanel(comparison) {
  const services = comparison.serviceIds.map(id => allServices().find(service => service.id === id)).filter(Boolean);
  return `<div class="detail-card"><p class="eyebrow">Comparison</p><h2>${escapeHtml(comparison.title)}</h2><p>${escapeHtml(comparison.summary)}</p>
    <div class="detail-list-grid detail-list-grid-wide">
    ${detailList("When To Choose What", comparison.choose)}
    <div class="notice"><strong>Exam trap:</strong> ${escapeHtml(comparison.examTrap)}</div>
    </div>
    <h3 style="margin-top:20px">Services</h3><div class="mini-service-list">${services.map(service => `<button data-service="${service.id}" class="comparison-chip">${escapeHtml(service.name)}</button>`).join("")}</div>
    <div class="detail-actions"><button class="btn btn-primary" id="atlas-tutor">Ask Atlas to tutor me</button></div>
    <section class="coach-section" id="service-tutor"><p class="coach-status">Atlas can explain the difference in exam language.</p></section></div>`;
}

function detailList(title, items = []) {
  return `<h3>${escapeHtml(title)}</h3><ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

async function requestServiceTutor() {
  const target = document.querySelector("#service-tutor");
  const service = selectedService();
  const comparison = state.selectedComparison ? state.atlas.comparisons.find(item => item.id === state.selectedComparison) : null;
  target.innerHTML = `<p class="coach-status"><span class="spinner"></span>Atlas is preparing a local-docs style explanation.</p>`;
  const context = comparison ? {
    type: "comparison",
    provider: state.atlas.provider,
    comparison,
    services: comparison.serviceIds.map(id => allServices().find(item => item.id === id)).filter(Boolean)
  } : {
    type: "service",
    provider: state.atlas.provider,
    service
  };
  const prompt = `You are Atlas, a practical cloud architecture tutor. Explain the following ${context.type} for a learner preparing for the Google Cloud Professional Cloud Architect exam.
Use the supplied catalog context as your source of truth. Do not invent pricing or SLA numbers. Be descriptive enough to teach the concept, but keep the answer focused.

Return JSON only:
{
  "summary": "3-5 sentences in plain English explaining what it is, why it exists, and how an architect should think about it",
  "mentalModel": "one memorable mental model",
  "whenToUse": ["3-5 bullets"],
  "watchOutFor": ["2-4 traps or non-use cases"],
  "examCue": "how to recognize this in a PCA question"
}

CONTEXT:
${JSON.stringify(context)}`;
  try {
    const response = await fetch("/ollama/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1:8b",
        prompt,
        stream: false,
        format: "json",
        options: { temperature: 0.2, num_predict: 1300 }
      })
    });
    if (!response.ok) throw new Error(`Ollama returned ${response.status}`);
    const payload = await response.json();
    renderServiceTutor(JSON.parse(payload.response));
  } catch (error) {
    target.innerHTML = `<p>Atlas is unavailable. Start Ollama with <code>ollama run llama3.1:8b</code> and try again.</p><button class="btn btn-secondary" id="retry-service-tutor">Retry</button>`;
    document.querySelector("#retry-service-tutor").addEventListener("click", requestServiceTutor);
  }
}

function renderServiceTutor(review) {
  const target = document.querySelector("#service-tutor");
  if (!target) return;
  target.innerHTML = `<h3>Atlas Tutor Notes</h3><p>${escapeHtml(review.summary || "")}</p><p><strong>Mental model:</strong> ${escapeHtml(review.mentalModel || "")}</p>${detailList("When to use", review.whenToUse || [])}${detailList("Watch out for", review.watchOutFor || [])}<div class="notice"><strong>Exam cue:</strong> ${escapeHtml(review.examCue || "")}</div>`;
}

home();
