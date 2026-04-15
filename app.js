// ═══════════════════════════════════════════════════════
//  APP.JS — Full portfolio application
// ═══════════════════════════════════════════════════════

// ── STATE ──────────────────────────────────────────────
const STATE = {
  tasksDone: new Set(),
  taskProgress: {},
  projectStatus: {},
  githubUser: '',
  githubData: null,
  darkMode: true,
  currentTab: 'roadmap',
  currentProjFilter: 'all',
  currentResFilter: 'all',
  currentTaskFilter: { phase: 'all', status: 'all' },
  progressHistory: [],
  weeklyHours: [0,0,0,0,0,0,0,0,0,0,0,0]
};

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem('mlr_state') || '{}');
    if (s.tasksDone) STATE.tasksDone = new Set(s.tasksDone);
    if (s.taskProgress) STATE.taskProgress = s.taskProgress;
    if (s.projectStatus) STATE.projectStatus = s.projectStatus;
    if (s.githubUser) STATE.githubUser = s.githubUser;
    if (s.darkMode !== undefined) STATE.darkMode = s.darkMode;
    if (s.progressHistory) STATE.progressHistory = s.progressHistory;
    if (s.weeklyHours) STATE.weeklyHours = s.weeklyHours;
  } catch(e) {}
}

function saveState() {
  try {
    localStorage.setItem('mlr_state', JSON.stringify({
      tasksDone: [...STATE.tasksDone],
      taskProgress: STATE.taskProgress,
      projectStatus: STATE.projectStatus,
      githubUser: STATE.githubUser,
      darkMode: STATE.darkMode,
      progressHistory: STATE.progressHistory,
      weeklyHours: STATE.weeklyHours
    }));
  } catch(e) {}
}

// ── INIT ───────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  applyTheme();
  initCursor();
  initHeroCanvas();
  initNav();
  renderPhases();
  renderTracker();
  renderProjects('all');
  renderResources('all');
  updateHeroStats();
  initCharts();
  initAnalytics();
  if (STATE.githubUser) {
    fetchGitHub(STATE.githubUser);
    document.getElementById('ghUsername').value = STATE.githubUser;
  }
  setupScrollReveal();
});

// ── THEME ──────────────────────────────────────────────
function applyTheme() {
  document.documentElement.setAttribute('data-theme', STATE.darkMode ? 'dark' : 'light');
}
document.getElementById('themeToggle').addEventListener('click', () => {
  STATE.darkMode = !STATE.darkMode;
  applyTheme();
  saveState();
  document.getElementById('themeToggle').querySelector('.toggle-icon').textContent = STATE.darkMode ? '◐' : '◑';
});

// ── CURSOR ─────────────────────────────────────────────
function initCursor() {
  const cur = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  let mx=0, my=0, tx=0, ty=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });
  function animTrail() {
    tx += (mx-tx)*0.15; ty += (my-ty)*0.15;
    trail.style.left = tx + 'px'; trail.style.top = ty + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();
  document.addEventListener('mousedown', () => cur.classList.add('clicking'));
  document.addEventListener('mouseup', () => cur.classList.remove('clicking'));
}

// ── CANVAS GRID ────────────────────────────────────────
function initHeroCanvas() {
  const canvas = document.getElementById('grid-canvas');
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; draw(); }
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const size = 48;
    ctx.strokeStyle = STATE.darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';
    ctx.lineWidth = 1;
    for(let x=0;x<canvas.width;x+=size) {
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke();
    }
    for(let y=0;y<canvas.height;y+=size) {
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke();
    }
    // Dots at intersections
    ctx.fillStyle = STATE.darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
    for(let x=0;x<canvas.width;x+=size) {
      for(let y=0;y<canvas.height;y+=size) {
        ctx.beginPath(); ctx.arc(x,y,1.5,0,Math.PI*2); ctx.fill();
      }
    }
  }
  window.addEventListener('resize', resize);
  resize();
}

// ── NAV ────────────────────────────────────────────────
function initNav() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      switchTab(tab);
    });
  });

  // Sticky nav on scroll
  const appShell = document.getElementById('app');
  const nav = document.getElementById('appNav');
  window.addEventListener('scroll', () => {
    const heroH = document.getElementById('hero').offsetHeight;
    if(window.scrollY > heroH - 80) {
      nav.classList.add('sticky');
      appShell.classList.add('nav-sticky');
    } else {
      nav.classList.remove('sticky');
      appShell.classList.remove('nav-sticky');
    }
  });
}

function switchTab(name) {
  STATE.currentTab = name;
  document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === 'panel-'+name));
  if(name === 'analytics') renderAnalytics();
  document.getElementById('app').scrollIntoView({behavior:'smooth'});
}

// ── HERO STATS ─────────────────────────────────────────
function updateHeroStats() {
  const days = Math.floor((new Date() - START_DATE) / 86400000);
  document.getElementById('stat-days').textContent = Math.max(0,days);
  document.getElementById('stat-tasks').textContent = STATE.tasksDone.size;
  const pct = Math.round(STATE.tasksDone.size / TASKS.length * 100);
  const phaseNum = getPhaseNum();
  document.getElementById('stat-phase').textContent = 'Ph.' + phaseNum;
}

function getPhaseNum() {
  const done = STATE.tasksDone.size;
  if(done < 13) return 1;
  if(done < 25) return 2;
  if(done < 39) return 3;
  if(done < 49) return 4;
  return 5;
}

// ── PHASES (ROADMAP) ───────────────────────────────────
function renderPhases() {
  const container = document.getElementById('phasesContainer');
  container.innerHTML = PHASES.map((ph, pi) => `
    <div class="phase-card" id="phase-${ph.id}">
      <div class="phase-card-header" onclick="togglePhase('${ph.id}')">
        <div class="phase-num-badge" style="color:${ph.color};">${ph.num}</div>
        <div class="phase-card-info">
          <div class="phase-card-title">${ph.title}</div>
          <div class="phase-card-meta">${ph.subtitle}</div>
          <div class="phase-inspired">Inspired by: ${ph.inspired}</div>
        </div>
        <div class="phase-toggle-btn" id="phase-toggle-${ph.id}">▼</div>
      </div>
      <div class="phase-card-body" id="phase-body-${ph.id}" style="display:${pi===0?'block':'none'}">
        <div class="modules-grid">
          ${ph.modules.map(mod => `
            <div class="module-card">
              <div class="mod-tag">${mod.num} · ${mod.weeks}</div>
              <div class="mod-title">${mod.title}</div>
              <ul class="mod-topics">
                ${mod.topics.map(t => `<li>${t}</li>`).join('')}
              </ul>
              <div class="mod-project-box">
                <div class="mod-proj-label">📁 Project</div>
                <div class="mod-proj-name">${mod.project.name}</div>
                <div class="mod-proj-desc">${mod.project.desc}</div>
              </div>
              <div class="mod-deliverables">
                <div class="deliv-label">Recruiter expects:</div>
                ${mod.deliverables.map(d => `<div class="deliv-item">✓ ${d}</div>`).join('')}
              </div>
              <div class="mod-sources">
                ${mod.sources.map(s => `<span class="source-chip">${s}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');

  // Open first phase by default
  document.querySelector(`#phase-p1 .phase-card-header`).parentElement.classList.add('open');
}

function togglePhase(id) {
  const body = document.getElementById('phase-body-'+id);
  const btn = document.getElementById('phase-toggle-'+id);
  const card = document.getElementById('phase-'+id);
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  btn.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
  card.classList.toggle('open', !isOpen);
}

// ── TASK TRACKER ───────────────────────────────────────
const PHASE_COLORS = {'Phase 1':'#22c55e','Phase 2':'#3b82f6','Phase 3':'#f59e0b','Phase 4':'#ef4444','Phase 5':'#a855f7'};

function renderTracker() {
  const sf = STATE.currentTaskFilter;
  const search = (document.getElementById('taskSearch')?.value || '').toLowerCase();
  const filtered = TASKS.filter(t => {
    const matchPhase = sf.phase === 'all' || t.phase === sf.phase;
    const isDone = STATE.tasksDone.has(t.id);
    const matchStatus = sf.status === 'all' || (sf.status === 'done' && isDone) || (sf.status === 'todo' && !isDone);
    const matchSearch = !search || t.name.toLowerCase().includes(search) || t.resource.toLowerCase().includes(search);
    return matchPhase && matchStatus && matchSearch;
  });

  // Progress
  const done = STATE.tasksDone.size;
  const pct = Math.round(done / TASKS.length * 100);
  document.getElementById('prog-text').textContent = `${done} / ${TASKS.length} tasks complete`;
  document.getElementById('prog-pct').textContent = pct + '%';
  document.getElementById('progFill').style.width = pct + '%';

  // Phase bars
  const phases = ['Phase 1','Phase 2','Phase 3','Phase 4','Phase 5'];
  document.getElementById('phaseBars').innerHTML = phases.map(ph => {
    const total = TASKS.filter(t=>t.phase===ph).length;
    const done = TASKS.filter(t=>t.phase===ph && STATE.tasksDone.has(t.id)).length;
    const p = Math.round(done/total*100);
    return `<div class="phase-bar-item">
      <span class="pb-label" style="color:${PHASE_COLORS[ph]}">${ph.replace('Phase ','P')}</span>
      <div class="pb-track"><div class="pb-fill" style="width:${p}%;background:${PHASE_COLORS[ph]}"></div></div>
      <span class="pb-count">${done}/${total}</span>
    </div>`;
  }).join('');

  // Task list
  document.getElementById('taskList').innerHTML = filtered.map(t => {
    const isDone = STATE.tasksDone.has(t.id);
    const prog = STATE.taskProgress[t.id] || (isDone ? 100 : 0);
    return `<div class="task-item ${isDone ? 'done' : ''} ${t.paper ? 'is-paper' : ''}" id="task-${t.id}">
      <label class="task-check">
        <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleTask(${t.id})" />
        <span class="checkmark"></span>
      </label>
      <div class="task-body">
        <div class="task-name">${t.name}</div>
        <div class="task-meta">
          <span class="task-phase-dot" style="background:${PHASE_COLORS[t.phase]}"></span>
          <span class="task-phase">${t.phase}</span>
          <span class="task-weeks">Wk ${t.weeks}</span>
          <span class="task-resource">${t.resource}</span>
        </div>
      </div>
      <div class="task-progress-wrap">
        <input type="range" class="task-slider" min="0" max="100" value="${prog}"
          oninput="updateProgress(${t.id},this.value)" title="${prog}%" />
        <span class="task-pct">${prog}%</span>
      </div>
    </div>`;
  }).join('');
}

function toggleTask(id) {
  if(STATE.tasksDone.has(id)) {
    STATE.tasksDone.delete(id);
    STATE.taskProgress[id] = 0;
  } else {
    STATE.tasksDone.add(id);
    STATE.taskProgress[id] = 100;
    trackProgress();
  }
  saveState();
  renderTracker();
  updateHeroStats();
}

function updateProgress(id, val) {
  STATE.taskProgress[id] = parseInt(val);
  document.querySelector(`#task-${id} .task-pct`).textContent = val + '%';
  saveState();
}

function trackProgress() {
  const today = new Date().toISOString().split('T')[0];
  const last = STATE.progressHistory[STATE.progressHistory.length-1];
  if(last && last.date === today) {
    last.count = STATE.tasksDone.size;
  } else {
    STATE.progressHistory.push({date: today, count: STATE.tasksDone.size});
  }
}

// Tracker filters
document.getElementById('panel-tracker').addEventListener('click', e => {
  const fb = e.target.closest('[data-filter]');
  if(fb) {
    const siblings = fb.closest('.filter-group').querySelectorAll('[data-filter]');
    siblings.forEach(b => b.classList.remove('active'));
    fb.classList.add('active');
    STATE.currentTaskFilter.phase = fb.dataset.filter;
    renderTracker();
  }
  const sb = e.target.closest('[data-status]');
  if(sb) {
    const siblings = sb.closest('.filter-group').querySelectorAll('[data-status]');
    siblings.forEach(b => b.classList.remove('active'));
    sb.classList.add('active');
    STATE.currentTaskFilter.status = sb.dataset.status;
    renderTracker();
  }
});

document.addEventListener('input', e => {
  if(e.target.id === 'taskSearch') renderTracker();
});

// ── PROJECTS ───────────────────────────────────────────
function renderProjects(filter) {
  STATE.currentProjFilter = filter;
  const filtered = PROJECTS.filter(p => filter === 'all' || p.phase === filter);
  document.getElementById('projectsGrid').innerHTML = filtered.map((p,i) => {
    const status = STATE.projectStatus[p.title] || p.status;
    const ghUser = STATE.githubUser;
    const ghLink = ghUser ? `https://github.com/${ghUser}/${p.repoName}` : '#';
    return `<div class="project-card" onclick="openProject(${PROJECTS.indexOf(p)})">
      <div class="project-card-top" style="border-color:${p.color}">
        <div class="proj-phase-label" style="color:${p.color}">${p.phase}</div>
        <div class="proj-title">${p.title}</div>
        <div class="proj-desc">${p.desc}</div>
        <div class="proj-stack">
          ${p.stack.map(s=>`<span class="stack-chip">${s}</span>`).join('')}
        </div>
      </div>
      <div class="project-card-bottom">
        <select class="status-select" onclick="event.stopPropagation()" onchange="updateProjStatus('${p.title}',this.value)">
          ${['Not Started','In Progress','Done','Review'].map(s=>`<option ${status===s?'selected':''}>${s}</option>`).join('')}
        </select>
        ${ghUser ? `<a href="${ghLink}" target="_blank" class="github-link" onclick="event.stopPropagation()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          View Repo</a>` : ''}
      </div>
    </div>`;
  }).join('');

  // Filter buttons
  document.querySelectorAll('[data-proj-filter]').forEach(b => {
    b.classList.toggle('active', b.dataset.projFilter === filter);
    b.onclick = () => renderProjects(b.dataset.projFilter);
  });
}

function updateProjStatus(title, val) {
  STATE.projectStatus[title] = val;
  saveState();
}

function openProject(idx) {
  const p = PROJECTS[idx];
  const status = STATE.projectStatus[p.title] || p.status;
  const ghUser = STATE.githubUser;
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-phase" style="color:${p.color}">${p.phase}</div>
    <div class="modal-title">${p.title}</div>
    <div class="modal-desc">${p.desc}</div>

    <div class="modal-section">
      <div class="modal-section-title">🎯 Recruiter-facing deliverables</div>
      ${p.deliverables.map(d=>`<div class="modal-deliverable">✓ ${d}</div>`).join('')}
    </div>

    <div class="modal-section">
      <div class="modal-section-title">💡 Why this matters</div>
      <div class="modal-note">${p.recruiterNote}</div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">📁 Repo structure</div>
      <pre class="modal-code">${p.repoStructure}</pre>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">⚙️ Stack</div>
      <div class="proj-stack">${p.stack.map(s=>`<span class="stack-chip">${s}</span>`).join('')}</div>
    </div>

    ${ghUser ? `<div class="modal-section">
      <div class="modal-section-title">🔗 GitHub</div>
      <a href="https://github.com/${ghUser}/${p.repoName}" target="_blank" class="modal-github-link">
        github.com/${ghUser}/${p.repoName}
      </a>
    </div>` : '<div class="modal-section"><em style="color:var(--muted)">Connect GitHub in Projects tab to see repo links</em></div>'}

    <div class="modal-actions">
      <select class="status-select" onchange="updateProjStatus('${p.title}',this.value)">
        ${['Not Started','In Progress','Done','Review'].map(s=>`<option ${status===s?'selected':''}>${s}</option>`).join('')}
      </select>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() { document.getElementById('modalOverlay').classList.remove('active'); }
document.getElementById('modalOverlay').addEventListener('click', e => { if(e.target===e.currentTarget) closeModal(); });

// ── GITHUB ─────────────────────────────────────────────
function saveGithubUser() {
  const val = document.getElementById('ghUsername').value.trim();
  if(!val) return;
  STATE.githubUser = val;
  saveState();
  fetchGitHub(val);
  renderProjects(STATE.currentProjFilter);
}

async function fetchGitHub(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    if(!res.ok) return;
    const repos = await res.json();
    const events = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
    const evData = await events.json();

    // Count commits in last year
    const commitEvents = evData.filter(e => e.type === 'PushEvent');
    const totalCommits = commitEvents.reduce((s,e) => s + (e.payload?.commits?.length || 0), 0);
    document.getElementById('stat-commits').textContent = totalCommits;
    document.getElementById('nav-commit-count').textContent = `⬤ ${username}`;

    // Build commit activity grid
    const commitDates = {};
    evData.forEach(e => {
      if(e.type === 'PushEvent') {
        const d = e.created_at.split('T')[0];
        commitDates[d] = (commitDates[d]||0) + (e.payload?.commits?.length || 0);
      }
    });
    STATE.githubData = { repos, commitDates, totalCommits };
    renderCommitGrid(commitDates);
  } catch(e) {
    console.log('GitHub fetch failed:', e);
  }
}

function renderCommitGrid(commitDates) {
  const wrap = document.getElementById('commitGrid');
  if(!wrap) return;
  const weeks = 26;
  const days = weeks * 7;
  const today = new Date();
  const cells = [];
  for(let i = days-1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const count = commitDates[key] || 0;
    const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4;
    cells.push(`<div class="cg-cell level-${level}" title="${key}: ${count} commits"></div>`);
  }
  wrap.innerHTML = cells.join('');
}

// ── RESOURCES ──────────────────────────────────────────
function renderResources(filter) {
  const filtered = RESOURCES.filter(r => filter === 'all' || r.type === filter);
  const typeIcons = {book:'📖',course:'🎓',youtube:'▶️',tool:'🔧',paper:'📄'};
  document.getElementById('resourcesGrid').innerHTML = filtered.map(r => `
    <a href="${r.url}" target="_blank" class="resource-card res-${r.type}">
      <div class="res-type-badge">${typeIcons[r.type]||'•'} ${r.type.toUpperCase()}</div>
      <div class="res-name">${r.name}</div>
      <div class="res-author">${r.author}</div>
      <div class="res-desc">${r.desc}</div>
      <div class="res-phase">${r.phase}</div>
    </a>
  `).join('');

  document.querySelectorAll('[data-res-filter]').forEach(b => {
    b.classList.toggle('active', b.dataset.resFilter === filter);
    b.onclick = () => renderResources(b.dataset.resFilter);
  });
}

// ── CHARTS ─────────────────────────────────────────────
let charts = {};

function initCharts() {
  // Inline Chart.js-like mini library using Canvas
  // Progress over time chart
  renderProgressChart();
  renderPhaseChart();
  renderHoursChart();
  renderSkillHeatmap();
}

function renderProgressChart() {
  const canvas = document.getElementById('progressChart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const history = STATE.progressHistory.length > 0
    ? STATE.progressHistory
    : [{date: new Date().toISOString().split('T')[0], count: STATE.tasksDone.size}];

  canvas.width = canvas.offsetWidth || 600;
  const W = canvas.width, H = canvas.height;
  const isDark = STATE.darkMode;
  const textCol = isDark ? '#9ca3af' : '#6b7280';
  const gridCol = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const lineCol = '#22c55e';

  ctx.clearRect(0,0,W,H);
  const pad = {l:40,r:20,t:20,b:40};
  const iW = W-pad.l-pad.r, iH = H-pad.t-pad.b;
  const maxY = TASKS.length;
  const pts = history.map((h,i) => ({
    x: pad.l + (i/(Math.max(history.length-1,1)))*iW,
    y: pad.t + iH - (h.count/maxY)*iH
  }));

  // Grid
  for(let i=0;i<=5;i++) {
    const y = pad.t + (i/5)*iH;
    ctx.strokeStyle = gridCol; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(W-pad.r,y); ctx.stroke();
    ctx.fillStyle=textCol; ctx.font='10px DM Mono,monospace'; ctx.textAlign='right';
    ctx.fillText(Math.round(maxY*(1-i/5)), pad.l-6, y+4);
  }

  // Area fill
  if(pts.length > 1) {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pad.t+iH);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length-1].x, pad.t+iH);
    ctx.closePath();
    ctx.fillStyle = 'rgba(34,197,94,0.12)'; ctx.fill();

    // Line
    ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
    pts.forEach(p => ctx.lineTo(p.x,p.y));
    ctx.strokeStyle=lineCol; ctx.lineWidth=2.5; ctx.stroke();
  }

  // Dots
  pts.forEach(p => {
    ctx.beginPath(); ctx.arc(p.x,p.y,4,0,Math.PI*2);
    ctx.fillStyle=lineCol; ctx.fill();
    ctx.strokeStyle=isDark?'#111':'#fff'; ctx.lineWidth=2; ctx.stroke();
  });

  // X labels (dates)
  ctx.fillStyle=textCol; ctx.font='10px DM Mono,monospace'; ctx.textAlign='center';
  history.forEach((h,i) => {
    if(history.length <= 10 || i % Math.ceil(history.length/8) === 0) {
      const x = pad.l + (i/(Math.max(history.length-1,1)))*iW;
      ctx.fillText(h.date.slice(5), x, H-pad.b+16);
    }
  });
}

function renderPhaseChart() {
  const canvas = document.getElementById('phaseChart');
  if(!canvas) return;
  canvas.width = canvas.offsetWidth || 300;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const isDark = STATE.darkMode;

  const phases = ['Phase 1','Phase 2','Phase 3','Phase 4','Phase 5'];
  const colors = ['#22c55e','#3b82f6','#f59e0b','#ef4444','#a855f7'];
  const data = phases.map(ph => {
    const total = TASKS.filter(t=>t.phase===ph).length;
    const done = TASKS.filter(t=>t.phase===ph && STATE.tasksDone.has(t.id)).length;
    return {total,done,pct:done/total};
  });

  ctx.clearRect(0,0,W,H);
  const pad = {l:10,r:10,t:20,b:10};
  const barH = (H-pad.t-pad.b-16)/phases.length;
  const labelW = 30;

  data.forEach((d,i) => {
    const y = pad.t + i*(barH+4);
    // Label
    ctx.fillStyle = isDark ? '#9ca3af' : '#6b7280';
    ctx.font = '10px DM Mono,monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`P${i+1}`, pad.l, y+barH/2+4);
    // Track
    const tx = pad.l+labelW, tw = W-tx-pad.r-36;
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    ctx.fillRect(tx, y, tw, barH-2);
    // Fill
    ctx.fillStyle = colors[i];
    ctx.fillRect(tx, y, tw*d.pct, barH-2);
    // Count
    ctx.fillStyle = isDark ? '#e5e7eb' : '#374151';
    ctx.textAlign = 'right';
    ctx.fillText(`${d.done}/${d.total}`, W-pad.r, y+barH/2+4);
  });
}

function renderHoursChart() {
  const canvas = document.getElementById('hoursChart');
  if(!canvas) return;
  canvas.width = canvas.offsetWidth || 300;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const isDark = STATE.darkMode;

  const target = 15;
  const wks = STATE.weeklyHours.length;
  const labels = STATE.weeklyHours.map((_,i)=>`W${i+1}`);
  const actual = STATE.weeklyHours;

  ctx.clearRect(0,0,W,H);
  const pad = {l:30,r:10,t:20,b:30};
  const iW = W-pad.l-pad.r, iH = H-pad.t-pad.b;
  const maxY = 20;
  const barW = iW/wks - 4;

  // Grid + target line
  ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  ctx.lineWidth=1;
  [0,5,10,15,20].forEach(v => {
    const y = pad.t+iH-(v/maxY)*iH;
    ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(W-pad.r,y); ctx.stroke();
  });

  // Target line
  const ty = pad.t+iH-(target/maxY)*iH;
  ctx.setLineDash([4,4]);
  ctx.strokeStyle = '#f59e0b'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(pad.l,ty); ctx.lineTo(W-pad.r,ty); ctx.stroke();
  ctx.setLineDash([]);

  // Bars
  actual.forEach((h,i) => {
    const x = pad.l + i*(iW/wks) + 2;
    const barH = (h/maxY)*iH;
    const col = h >= target ? '#22c55e' : h > 0 ? '#f59e0b' : (isDark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)');
    ctx.fillStyle = col;
    ctx.fillRect(x, pad.t+iH-barH, barW, barH);
    ctx.fillStyle = isDark ? '#6b7280' : '#9ca3af';
    ctx.font = '9px DM Mono,monospace'; ctx.textAlign='center';
    ctx.fillText(labels[i], x+barW/2, H-pad.b+12);
  });

  // Y labels
  ctx.fillStyle = isDark ? '#9ca3af' : '#6b7280';
  ctx.font = '9px DM Mono,monospace'; ctx.textAlign='right';
  [0,10,20].forEach(v => {
    ctx.fillText(v, pad.l-4, pad.t+iH-(v/maxY)*iH+4);
  });
}

function renderSkillHeatmap() {
  const wrap = document.getElementById('skillHeatmap');
  if(!wrap) return;

  // Calculate skill levels from task completion
  const skillLevels = {};
  SKILLS.forEach(cat => {
    cat.skills.forEach(skill => {
      // Rough heuristic: map skills to task ids
      const relevant = TASKS.filter(t =>
        t.name.toLowerCase().includes(skill.toLowerCase().split('/')[0].split(' ')[0]) ||
        t.resource.toLowerCase().includes(skill.toLowerCase().split('/')[0].split(' ')[0])
      );
      const done = relevant.filter(t => STATE.tasksDone.has(t.id)).length;
      const total = Math.max(relevant.length, 1);
      skillLevels[skill] = done/total;
    });
  });

  wrap.innerHTML = SKILLS.map(cat => `
    <div class="hm-cat">
      <div class="hm-cat-label">${cat.cat}</div>
      <div class="hm-skills">
        ${cat.skills.map(skill => {
          const level = skillLevels[skill] || 0;
          const intensity = Math.round(level * 4);
          return `<div class="hm-skill level-${intensity}" title="${skill}: ${Math.round(level*100)}%">
            <span class="hm-skill-name">${skill}</span>
            <div class="hm-bar"><div class="hm-fill" style="width:${level*100}%"></div></div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `).join('');
}

function renderAnalytics() {
  // Re-render charts when tab opens
  setTimeout(() => {
    renderProgressChart();
    renderPhaseChart();
    renderHoursChart();
    renderSkillHeatmap();
    if(STATE.githubData) renderCommitGrid(STATE.githubData.commitDates);
  }, 50);
}

function initAnalytics() {
  // Handle weekly hours input — double-click a bar to log hours
  // (Simplified: just render what's there)
}

// ── DEPLOY GUIDE ───────────────────────────────────────
function showDeployGuide() {
  document.getElementById('deployBody').innerHTML = `
    <div class="deploy-title">⚡ Deploy to GitHub Pages</div>
    <div class="deploy-sub">Your live portfolio URL: <strong>https://YOUR_USERNAME.github.io/ml-portfolio/</strong></div>

    <div class="deploy-steps">
      <div class="deploy-step">
        <div class="step-num">1</div>
        <div class="step-body">
          <div class="step-title">Create a new GitHub repo</div>
          <pre class="deploy-code">gh repo create ml-portfolio --public</pre>
          <div class="step-note">Or create it at github.com/new — name it <code>ml-portfolio</code></div>
        </div>
      </div>

      <div class="deploy-step">
        <div class="step-num">2</div>
        <div class="step-body">
          <div class="step-title">Copy all portfolio files into the repo</div>
          <pre class="deploy-code">cp -r portfolio/ ml-portfolio/
cd ml-portfolio
git init
git add .
git commit -m "🚀 Launch ML portfolio"
git remote add origin https://github.com/YOUR_USERNAME/ml-portfolio.git
git push -u origin main</pre>
        </div>
      </div>

      <div class="deploy-step">
        <div class="step-num">3</div>
        <div class="step-body">
          <div class="step-title">Enable GitHub Pages</div>
          <div class="step-note">Go to your repo → Settings → Pages → Source: Deploy from branch → Branch: <code>main</code> → Folder: <code>/ (root)</code> → Save</div>
        </div>
      </div>

      <div class="deploy-step">
        <div class="step-num">4</div>
        <div class="step-body">
          <div class="step-title">Done — live in ~60 seconds</div>
          <div class="step-note">Your portfolio is live at <strong>https://YOUR_USERNAME.github.io/ml-portfolio/</strong></div>
        </div>
      </div>

      <div class="deploy-step">
        <div class="step-num">5</div>
        <div class="step-body">
          <div class="step-title">Add GitHub Actions for auto-deploy (optional)</div>
          <pre class="deploy-code"># .github/workflows/deploy.yml
name: Deploy Portfolio
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./</pre>
        </div>
      </div>

    </div>

    <div class="deploy-tips">
      <div class="tip-title">💡 Pro tips</div>
      <div class="tip">Add a custom domain in Settings → Pages → Custom domain</div>
      <div class="tip">Link this portfolio from your LinkedIn, resume, and every GitHub repo README</div>
      <div class="tip">Share the URL in ML communities — this is public evidence of your work</div>
      <div class="tip">Add <code>?v=2</code> to cache-bust after updates</div>
    </div>
  `;
  document.getElementById('deployOverlay').classList.add('active');
}
function closeDeployModal() { document.getElementById('deployOverlay').classList.remove('active'); }
document.getElementById('deployOverlay').addEventListener('click', e => { if(e.target===e.currentTarget) closeDeployModal(); });

// ── SCROLL REVEAL ──────────────────────────────────────
function setupScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) e.target.classList.add('revealed');
    });
  }, {threshold: 0.1});
  document.querySelectorAll('.phase-card, .module-card, .project-card, .resource-card').forEach(el => {
    observer.observe(el);
  });
}

// ── RESIZE CHARTS ──────────────────────────────────────
window.addEventListener('resize', () => {
  if(STATE.currentTab === 'analytics') renderAnalytics();
});
