/* =====================================================
   LEAVE PORTAL - MAIN JAVASCRIPT
   Enterprise UI Interactions & Data
   ===================================================== */

/* ── Dummy Data ────────────────────────────────────── */
const APP_DATA = {
  currentUser: {
    name: 'Arjun Sharma',
    initials: 'AS',
    role: 'Senior Software Engineer',
    dept: 'Engineering',
    empId: 'EMP-2024-0187',
    avatar: 'AS',
    color: '#00c3ff',
    joined: '12 Mar 2021',
    manager: 'Priya Nair'
  },
  leaveBalance: {
    casual:  { total: 15, used: 6,  remaining: 9  },
    sick:    { total: 12, used: 3,  remaining: 9  },
    paid:    { total: 21, used: 10, remaining: 11 },
    comp:    { total: 5,  used: 1,  remaining: 4  }
  },
  holidays: [
    { date: '26', month: 'Jan', name: 'Republic Day',      day: 'Monday', type: 'National' },
    { date: '14', month: 'Apr', name: 'Dr. Ambedkar Jayanti', day: 'Monday', type: 'National' },
    { date: '01', month: 'May', name: 'Labour Day',        day: 'Thursday', type: 'National' },
    { date: '15', month: 'Aug', name: 'Independence Day',  day: 'Friday',   type: 'National' },
    { date: '02', month: 'Oct', name: "Gandhi Jayanti",    day: 'Thursday', type: 'National' },
    { date: '25', month: 'Dec', name: 'Christmas Day',     day: 'Thursday', type: 'National' },
  ],
  recentLeaves: [
    { type: 'Casual Leave', dates: 'Mar 15 – Mar 16, 2025', days: 2, status: 'approved', reason: 'Personal work' },
    { type: 'Sick Leave',   dates: 'Feb 22 – Feb 23, 2025', days: 2, status: 'approved', reason: 'Fever & cold' },
    { type: 'Paid Leave',   dates: 'Jan 6 – Jan 10, 2025',  days: 5, status: 'approved', reason: 'Family vacation' },
    { type: 'Casual Leave', dates: 'Apr 1, 2025',            days: 1, status: 'pending',  reason: 'Doctor appointment' },
    { type: 'Comp Off',     dates: 'Apr 12, 2025',           days: 1, status: 'rejected', reason: 'Weekend working' },
  ],
  employees: [
    { id:'EMP-001', name:'Arjun Sharma',   initials:'AS', dept:'Engineering', type:'Casual Leave',  from:'2025-04-01', to:'2025-04-02', days:2, status:'pending',  color:'#00c3ff' },
    { id:'EMP-002', name:'Priya Nair',     initials:'PN', dept:'Design',       type:'Sick Leave',    from:'2025-03-29', to:'2025-03-30', days:2, status:'approved', color:'#8b5cf6' },
    { id:'EMP-003', name:'Rohan Mehta',    initials:'RM', dept:'Sales',        type:'Paid Leave',    from:'2025-04-07', to:'2025-04-11', days:5, status:'pending',  color:'#06ffa5' },
    { id:'EMP-004', name:'Sneha Reddy',    initials:'SR', dept:'HR',           type:'Casual Leave',  from:'2025-04-03', to:'2025-04-03', days:1, status:'approved', color:'#f472b6' },
    { id:'EMP-005', name:'Kiran Joshi',    initials:'KJ', dept:'Finance',      type:'Comp Off',      from:'2025-04-14', to:'2025-04-14', days:1, status:'rejected', color:'#fb923c' },
    { id:'EMP-006', name:'Nisha Gupta',    initials:'NG', dept:'Engineering',  type:'Paid Leave',    from:'2025-04-20', to:'2025-04-25', days:6, status:'pending',  color:'#00c3ff' },
    { id:'EMP-007', name:'Aditya Kumar',   initials:'AK', dept:'Marketing',    type:'Sick Leave',    from:'2025-04-08', to:'2025-04-09', days:2, status:'approved', color:'#8b5cf6' },
    { id:'EMP-008', name:'Divya Pillai',   initials:'DP', dept:'Operations',   type:'Casual Leave',  from:'2025-04-16', to:'2025-04-16', days:1, status:'pending',  color:'#f472b6' },
  ],
  notifications: [
    { icon:'fa-check-circle', iconColor:'#06ffa5', iconBg:'rgba(6,255,165,0.12)', title:'Leave Approved', desc:'Your Casual Leave (Apr 1–2) was approved by Priya Nair', time:'2h ago', unread:true },
    { icon:'fa-clock',        iconColor:'#fb923c', iconBg:'rgba(251,146,60,0.12)', title:'Pending Approval', desc:'Rohan Mehta\'s Paid Leave request is awaiting your review', time:'5h ago', unread:true },
    { icon:'fa-times-circle', iconColor:'#f472b6', iconBg:'rgba(244,114,182,0.12)', title:'Leave Rejected', desc:'Your Comp Off request (Apr 12) was not approved', time:'1d ago', unread:false },
    { icon:'fa-calendar-alt', iconColor:'#00c3ff', iconBg:'rgba(0,195,255,0.12)', title:'Upcoming Holiday', desc:'Independence Day holiday on Aug 15 (Friday)', time:'2d ago', unread:false },
    { icon:'fa-users',        iconColor:'#8b5cf6', iconBg:'rgba(139,92,246,0.12)', title:'Team Update', desc:'3 team members are on leave next week', time:'3d ago', unread:false },
  ]
};

/* ── State ─────────────────────────────────────────── */
const STATE = {
  sidebarCollapsed: false,
  currentPage: 'dashboard',
  calendarDate: new Date(2025, 3, 1), // April 2025
  chartsInit: {},
  tableFilter: '',
  tableStatus: 'all'
};

/* ── Init ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initParticles();
  initSidebar();
  initNavigation();
  initDashboard();
  initLeaveRequest();
  initHRAdmin();
  initCalendar();
  initToasts();
  initAnimatedCounters();
});

/* ── Loading Screen ────────────────────────────────── */
function initLoadingScreen() {
  const overlay = document.getElementById('loadingOverlay');
  if (!overlay) return;
  setTimeout(() => {
    overlay.classList.add('hidden');
    setTimeout(() => overlay.remove(), 600);
    showToast('Welcome back, Arjun! 👋', 'info');
  }, 1800);
}

/* ── Particles on Login ────────────────────────────── */
function initParticles() {
  const container = document.querySelector('.particles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.6 + 0.2};
    `;
    container.appendChild(p);
  }
}

/* ── Sidebar ───────────────────────────────────────── */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const toggleBtn = document.getElementById('sidebarToggle');
  const mobileToggle = document.getElementById('mobileMenuToggle');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      STATE.sidebarCollapsed = !STATE.sidebarCollapsed;
      sidebar.classList.toggle('collapsed', STATE.sidebarCollapsed);
      mainContent.classList.toggle('expanded', STATE.sidebarCollapsed);
      const icon = toggleBtn.querySelector('i');
      icon.className = STATE.sidebarCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
    });
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !sidebar.contains(e.target) && e.target !== mobileToggle) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }
}

/* ── Navigation ────────────────────────────────────── */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item[data-page]');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      navigateTo(page);
    });
  });
}

function navigateTo(page) {
  // Update nav
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  const activeNav = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (activeNav) activeNav.classList.add('active');

  // Update pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const activePage = document.getElementById(`page-${page}`);
  if (activePage) activePage.classList.add('active');

  // Update topbar title
  const titles = {
    dashboard: { title: 'Dashboard', sub: 'Welcome back, Arjun! Here\'s your overview.' },
    leave:     { title: 'Apply for Leave', sub: 'Submit a new leave request' },
    admin:     { title: 'HR Admin Panel', sub: 'Manage employee leave requests' },
    calendar:  { title: 'Leave Calendar', sub: 'Visual overview of team leaves' },
    history:   { title: 'Leave History', sub: 'Your complete leave record' },
    settings:  { title: 'Settings', sub: 'Account and notification preferences' }
  };
  const info = titles[page] || titles.dashboard;
  const tb = document.getElementById('topbarTitle');
  const ts = document.getElementById('topbarSub');
  if (tb) tb.textContent = info.title;
  if (ts) ts.textContent = info.sub;

  STATE.currentPage = page;

  // Lazy-init charts
  if (page === 'dashboard' && !STATE.chartsInit.dashboard) initDashboardCharts();
  if (page === 'admin' && !STATE.chartsInit.admin) initAdminCharts();
  if (page === 'calendar') renderCalendar();

  // Close mobile sidebar
  document.getElementById('sidebar')?.classList.remove('mobile-open');
}

/* ── Dashboard ─────────────────────────────────────── */
function initDashboard() {
  renderLeaveBalanceCards();
  renderTimeline();
  renderHolidays();
  renderNotifications();
  // Quick action buttons
  document.querySelectorAll('.wb-quick-btn[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.goto));
  });
  // Profile nav
  document.getElementById('userProfile')?.addEventListener('click', () => navigateTo('settings'));
  // Init charts after a slight delay
  setTimeout(initDashboardCharts, 400);
}

/* Leave Balance Cards with animated progress */
function renderLeaveBalanceCards() {
  const { casual, sick, paid, comp } = APP_DATA.leaveBalance;
  const cards = [
    { id: 'balanceCasual', ...casual, type: 'casual', icon: 'fa-sun', label: 'Casual Leave' },
    { id: 'balanceSick',   ...sick,   type: 'sick',   icon: 'fa-heartbeat', label: 'Sick Leave' },
    { id: 'balancePaid',   ...paid,   type: 'paid',   icon: 'fa-plane', label: 'Paid Leave' },
    { id: 'balanceComp',   ...comp,   type: 'comp',   icon: 'fa-clock', label: 'Comp Off' }
  ];

  cards.forEach(({ id, total, used, remaining, type, icon, label }) => {
    const pct = Math.round((used / total) * 100);
    const r = 26;
    const circ = 2 * Math.PI * r;
    const offset = circ - (pct / 100) * circ;

    const card = document.getElementById(id);
    if (!card) return;

    card.innerHTML = `
      <div class="lbc-header">
        <span class="lbc-title">${label}</span>
        <div class="lbc-icon"><i class="fas ${icon}"></i></div>
      </div>
      <div class="lbc-progress">
        <div class="circle-progress">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle class="track" cx="32" cy="32" r="${r}"/>
            <circle class="fill" cx="32" cy="32" r="${r}"
              stroke-dasharray="${circ}"
              stroke-dashoffset="${circ}"
              data-offset="${offset}"
            />
          </svg>
          <div class="label">${pct}%</div>
        </div>
        <div class="lbc-numbers">
          <strong>${remaining}</strong>
          <span>${used} used / ${total} total</span>
        </div>
      </div>
      <div class="lbc-bar-wrap">
        <div class="lbc-bar" style="width:0%" data-width="${pct}%"></div>
      </div>
    `;

    // Animate after paint
    requestAnimationFrame(() => {
      setTimeout(() => {
        card.querySelector('.fill').style.strokeDashoffset = offset;
        const bar = card.querySelector('.lbc-bar');
        if (bar) bar.style.width = bar.dataset.width;
      }, 300);
    });
  });
}

/* Recent Leave Timeline */
function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;
  container.innerHTML = APP_DATA.recentLeaves.map(l => `
    <div class="timeline-item">
      <div class="tl-dot-wrap">
        <div class="tl-dot ${l.status}"></div>
        <div class="tl-line"></div>
      </div>
      <div class="tl-content">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
          <span class="tl-title">${l.type}</span>
          <span class="status-pill ${l.status}">${capitalize(l.status)}</span>
        </div>
        <div class="tl-meta">
          <span><i class="far fa-calendar" style="margin-right:4px;color:var(--neon-blue)"></i>${l.dates}</span>
          <span>${l.days} day${l.days > 1 ? 's' : ''}</span>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${l.reason}</div>
      </div>
    </div>
  `).join('');
}

/* Upcoming Holidays */
function renderHolidays() {
  const container = document.getElementById('holidayList');
  if (!container) return;
  const upcoming = APP_DATA.holidays.slice(0, 4);
  container.innerHTML = upcoming.map(h => `
    <div class="holiday-item">
      <div class="hd-date"><strong>${h.date}</strong><span>${h.month}</span></div>
      <div class="hd-info">
        <strong>${h.name}</strong>
        <span>${h.day}</span>
      </div>
      <span class="hd-tag">${h.type}</span>
    </div>
  `).join('');
}

/* Notifications */
function renderNotifications() {
  const container = document.getElementById('notifList');
  if (!container) return;
  container.innerHTML = APP_DATA.notifications.map(n => `
    <div class="notif-item${n.unread ? ' unread' : ''}" onclick="this.classList.remove('unread')">
      <div class="notif-icon" style="background:${n.iconBg};color:${n.iconColor}">
        <i class="fas ${n.icon}"></i>
      </div>
      <div class="notif-content">
        <strong>${n.title}</strong>
        <span>${n.desc}</span>
      </div>
      <span class="notif-time">${n.time}</span>
    </div>
  `).join('');
}

/* ── Dashboard Charts ──────────────────────────────── */
function initDashboardCharts() {
  if (STATE.chartsInit.dashboard) return;
  STATE.chartsInit.dashboard = true;

  const chartDefaults = {
    plugins: { legend: { display: false } },
    animation: { duration: 1200, easing: 'easeInOutQuart' }
  };

  // Monthly leave trend
  const trendCtx = document.getElementById('trendChart');
  if (trendCtx) {
    new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
          label: 'Leaves Taken',
          data: [2,1,3,2,4,1,0,2,1,3,2,1],
          borderColor: '#00c3ff',
          backgroundColor: 'rgba(0,195,255,0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.45,
          pointRadius: 4,
          pointBackgroundColor: '#00c3ff',
          pointBorderColor: '#040b1a',
          pointBorderWidth: 2
        }]
      },
      options: {
        ...chartDefaults,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#7a90b8', font: { size: 11 } } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#7a90b8', font: { size: 11 }, stepSize: 1 }, min: 0 }
        },
        plugins: { legend: { display: false }, tooltip: tooltipConfig() }
      }
    });
  }

  // Leave type donut
  const donutCtx = document.getElementById('donutChart');
  if (donutCtx) {
    new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Casual', 'Sick', 'Paid', 'Comp Off'],
        datasets: [{
          data: [6,3,10,1],
          backgroundColor: ['rgba(0,195,255,0.8)','rgba(244,114,182,0.8)','rgba(6,255,165,0.8)','rgba(251,146,60,0.8)'],
          borderColor: ['#00c3ff','#f472b6','#06ffa5','#fb923c'],
          borderWidth: 1,
          hoverOffset: 8
        }]
      },
      options: {
        ...chartDefaults,
        cutout: '72%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'right', labels: { color: '#7a90b8', font: { size: 11 }, padding: 12, usePointStyle: true } },
          tooltip: tooltipConfig()
        }
      }
    });
  }
}

/* ── Admin Charts ──────────────────────────────────── */
function initAdminCharts() {
  if (STATE.chartsInit.admin) return;
  STATE.chartsInit.admin = true;

  // Dept attendance bar
  const barCtx = document.getElementById('deptChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Engineering','Design','Sales','HR','Finance','Marketing','Operations'],
        datasets: [{
          label: 'On Leave',
          data: [4,2,3,1,2,3,2],
          backgroundColor: 'rgba(0,195,255,0.6)',
          borderColor: '#00c3ff',
          borderWidth: 1,
          borderRadius: 6
        },{
          label: 'Present',
          data: [38,14,22,9,18,19,28],
          backgroundColor: 'rgba(6,255,165,0.4)',
          borderColor: '#06ffa5',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { color: '#7a90b8', font: { size: 11 }, usePointStyle: true } },
          tooltip: tooltipConfig()
        },
        scales: {
          x: { stacked: true, grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#7a90b8', font: { size: 10 } } },
          y: { stacked: true, grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#7a90b8', font: { size: 11 } } }
        },
        animation: { duration: 1200, easing: 'easeInOutQuart' }
      }
    });
  }

  // Leave status pie
  const pieCtx = document.getElementById('statusChart');
  if (pieCtx) {
    new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Approved','Pending','Rejected'],
        datasets: [{
          data: [24,11,5],
          backgroundColor: ['rgba(6,255,165,0.7)','rgba(251,146,60,0.7)','rgba(244,114,182,0.7)'],
          borderColor: ['#06ffa5','#fb923c','#f472b6'],
          borderWidth: 1,
          hoverOffset: 6
        }]
      },
      options: {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'bottom', labels: { color: '#7a90b8', font: { size: 11 }, usePointStyle: true, padding: 14 } },
          tooltip: tooltipConfig()
        },
        animation: { duration: 1200 }
      }
    });
  }
}

function tooltipConfig() {
  return {
    tooltip: {
      backgroundColor: 'rgba(6,14,34,0.95)',
      borderColor: 'rgba(0,195,255,0.3)',
      borderWidth: 1,
      titleColor: '#f0f4ff',
      bodyColor: '#7a90b8',
      padding: 12,
      cornerRadius: 10
    }
  }.tooltip;
}

/* ── Animated Counters ─────────────────────────────── */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1400;
  const start = performance.now();
  const ease = (t) => t < 0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.round(ease(progress) * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── Leave Request Form ────────────────────────────── */
function initLeaveRequest() {
  const form = document.getElementById('leaveForm');
  if (!form) return;

  // Date input min constraint
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('#fromDate, #toDate').forEach(inp => inp.setAttribute('min', today));

  document.getElementById('fromDate')?.addEventListener('change', function() {
    document.getElementById('toDate')?.setAttribute('min', this.value);
    calcDays();
  });
  document.getElementById('toDate')?.addEventListener('change', calcDays);

  // File upload drop zone
  const uploadArea = document.getElementById('uploadArea');
  if (uploadArea) {
    uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
    uploadArea.addEventListener('dragleave', ()=> uploadArea.classList.remove('drag-over'));
    uploadArea.addEventListener('drop', e => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      if (files.length) handleFiles(files);
    });
    uploadArea.querySelector('input')?.addEventListener('change', function() {
      if (this.files.length) handleFiles(this.files);
    });
  }

  form.addEventListener('submit', handleLeaveSubmit);
}

function calcDays() {
  const from = document.getElementById('fromDate')?.value;
  const to   = document.getElementById('toDate')?.value;
  const disp = document.getElementById('daysCount');
  if (!from || !to || !disp) return;
  const diff = Math.ceil((new Date(to) - new Date(from)) / (1000*60*60*24)) + 1;
  disp.textContent = diff > 0 ? `${diff} working day${diff > 1 ? 's' : ''} selected` : '';
}

function handleFiles(files) {
  const area = document.getElementById('uploadArea');
  if (!area) return;
  const name = Array.from(files).map(f => f.name).join(', ');
  area.querySelector('p').textContent = `📎 ${name}`;
  area.querySelector('span').textContent = 'File(s) attached';
}

function handleLeaveSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitLeaveBtn');
  const type = document.getElementById('leaveType')?.value;
  const from = document.getElementById('fromDate')?.value;
  const to   = document.getElementById('toDate')?.value;
  const reason = document.getElementById('leaveReason')?.value;

  // Validation
  if (!type) { showToast('Please select a leave type', 'error'); shakeField('leaveType'); return; }
  if (!from)  { showToast('Please select a start date', 'error'); shakeField('fromDate'); return; }
  if (!to)    { showToast('Please select an end date',   'error'); shakeField('toDate'); return; }
  if (!reason || reason.trim().length < 10) { showToast('Please provide a reason (min 10 chars)', 'error'); shakeField('leaveReason'); return; }

  // Submit animation
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting…';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Submitted!';
    btn.style.background = 'linear-gradient(135deg,#06ffa5,#00c3ff)';
    showToast('Leave request submitted successfully!', 'success');
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Leave Request';
      btn.style.background = '';
      e.target.reset();
      document.getElementById('daysCount').textContent = '';
    }, 2500);
  }, 1600);
}

function shakeField(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shake 0.4s ease';
  el.style.borderColor = 'rgba(244,114,182,0.6)';
  setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 800);
}

// Add shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }`;
document.head.appendChild(shakeStyle);

/* ── HR Admin Panel ────────────────────────────────── */
function initHRAdmin() {
  renderEmployeeTable(APP_DATA.employees);

  // Search
  document.getElementById('empSearch')?.addEventListener('input', function() {
    STATE.tableFilter = this.value.toLowerCase();
    filterTable();
  });

  // Status filter
  document.getElementById('statusFilter')?.addEventListener('change', function() {
    STATE.tableStatus = this.value;
    filterTable();
  });
}

function filterTable() {
  const filtered = APP_DATA.employees.filter(emp => {
    const matchText = !STATE.tableFilter ||
      emp.name.toLowerCase().includes(STATE.tableFilter) ||
      emp.dept.toLowerCase().includes(STATE.tableFilter) ||
      emp.type.toLowerCase().includes(STATE.tableFilter);
    const matchStatus = STATE.tableStatus === 'all' || emp.status === STATE.tableStatus;
    return matchText && matchStatus;
  });
  renderEmployeeTable(filtered);
}

function renderEmployeeTable(data) {
  const tbody = document.getElementById('empTableBody');
  if (!tbody) return;
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)"><i class="fas fa-search" style="display:block;font-size:24px;margin-bottom:10px;"></i>No records found</td></tr>`;
    return;
  }
  tbody.innerHTML = data.map((emp, i) => `
    <tr style="animation: fadeSlideUp ${0.05 * i + 0.1}s ease both">
      <td>
        <div class="emp-cell">
          <div class="emp-avatar" style="background:linear-gradient(135deg,${emp.color},${emp.color}88)">${emp.initials}</div>
          <div>
            <strong>${emp.name}</strong>
            <div style="font-size:11px;color:var(--text-muted)">${emp.id}</div>
          </div>
        </div>
      </td>
      <td>${emp.dept}</td>
      <td><strong>${emp.type}</strong></td>
      <td>${formatDate(emp.from)}</td>
      <td>${formatDate(emp.to)}</td>
      <td><span class="status-pill ${emp.status}">${capitalize(emp.status)}</span></td>
      <td>
        <div class="action-btns">
          ${emp.status === 'pending' ? `
            <button class="btn btn-success" onclick="handleLeaveAction('${emp.id}','approved',this)">
              <i class="fas fa-check"></i> Approve
            </button>
            <button class="btn btn-danger" onclick="handleLeaveAction('${emp.id}','rejected',this)">
              <i class="fas fa-times"></i> Reject
            </button>
          ` : `<span style="font-size:12px;color:var(--text-muted)">— Actioned —</span>`}
        </div>
      </td>
    </tr>
  `).join('');
}

function handleLeaveAction(empId, action, btn) {
  const emp = APP_DATA.employees.find(e => e.id === empId);
  if (!emp) return;
  const row = btn.closest('tr');
  row.style.opacity = '0.5';
  row.style.pointerEvents = 'none';
  setTimeout(() => {
    emp.status = action;
    filterTable();
    showToast(
      action === 'approved'
        ? `✅ Leave approved for ${emp.name}`
        : `❌ Leave rejected for ${emp.name}`,
      action === 'approved' ? 'success' : 'error'
    );
  }, 600);
}

/* ── Calendar ──────────────────────────────────────── */
function initCalendar() {
  document.getElementById('calPrev')?.addEventListener('click', () => {
    STATE.calendarDate = new Date(STATE.calendarDate.getFullYear(), STATE.calendarDate.getMonth() - 1, 1);
    renderCalendar();
  });
  document.getElementById('calNext')?.addEventListener('click', () => {
    STATE.calendarDate = new Date(STATE.calendarDate.getFullYear(), STATE.calendarDate.getMonth() + 1, 1);
    renderCalendar();
  });
}

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  const titleEl = document.getElementById('calTitle');
  if (!grid || !titleEl) return;

  const d = STATE.calendarDate;
  const year = d.getFullYear();
  const month = d.getMonth();
  titleEl.textContent = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();
  const today = new Date();

  // Sample: approved leaves on 1-2 Apr, pending on 7-8 Apr, holidays on 14 Apr
  const approvedDays = [1, 2, 15, 16];
  const pendingDays  = [7, 8, 21];
  const holidayDays  = [14, 19];

  let html = '';

  // Day headers
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(day => {
    html += `<div class="cal-day-header">${day}</div>`;
  });

  // Previous month overflow
  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="cal-day other-month">${daysInPrev - i}</div>`;
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dow = date.getDay();
    const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    const isWeekend = dow === 0 || dow === 6;
    let cls = 'cal-day';
    if (isToday)                    cls += ' today';
    if (isWeekend)                  cls += ' weekend';
    if (approvedDays.includes(day)) cls += ' leave-approved';
    else if (pendingDays.includes(day))  cls += ' leave-pending';
    else if (holidayDays.includes(day))  cls += ' holiday';

    const tooltip = approvedDays.includes(day) ? 'Approved Leave' : pendingDays.includes(day) ? 'Pending Leave' : holidayDays.includes(day) ? 'Holiday' : '';
    html += `<div class="${cls}" title="${tooltip}" onclick="calDayClick(${day})">${day}</div>`;
  }

  // Next month overflow
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  let nextDay = 1;
  for (let i = firstDay + daysInMonth; i < totalCells; i++, nextDay++) {
    html += `<div class="cal-day other-month">${nextDay}</div>`;
  }

  grid.innerHTML = html;
}

function calDayClick(day) {
  document.querySelectorAll('.cal-day').forEach(d => d.classList.remove('selected'));
  event.target.classList.add('selected');
  const d = STATE.calendarDate;
  const dateStr = new Date(d.getFullYear(), d.getMonth(), day)
    .toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  showToast(`Selected: ${dateStr}`, 'info');
}

/* ── Toast Notifications ───────────────────────────── */
function initToasts() {
  if (!document.getElementById('toast-container')) {
    const tc = document.createElement('div');
    tc.id = 'toast-container';
    document.body.appendChild(tc);
  }
}

function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ── Login ─────────────────────────────────────────── */
function togglePassword() {
  const inp = document.getElementById('passwordInput');
  const icon = document.getElementById('passToggleIcon');
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  if (icon) icon.className = inp.type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
}

function handleLogin(e) {
  e?.preventDefault();
  const email = document.getElementById('emailInput')?.value;
  const pass  = document.getElementById('passwordInput')?.value;
  if (!email) { showToast('Please enter your email', 'error'); return; }
  if (!pass)  { showToast('Please enter your password', 'error'); return; }

  const btn = document.getElementById('loginBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in…';

  setTimeout(() => {
    // Simulate login → go to dashboard
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('appLayout').style.display = 'flex';
    navigateTo('dashboard');
    initAnimatedCounters();
    setTimeout(() => initDashboardCharts(), 500);
    showToast('Welcome back, Arjun! 👋', 'success');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-arrow-right"></i> Sign In';
  }, 1800);
}

/* ── Helpers ───────────────────────────────────────── */
function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

function formatDate(str) {
  if (!str) return '—';
  return new Date(str).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}

// Demo: make bell icon toggle notifications
document.addEventListener('click', (e) => {
  if (e.target.closest('#bellBtn')) {
    navigateTo('dashboard');
    // scroll to notifications
    setTimeout(() => {
      document.getElementById('notifList')?.closest('.card')?.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 100);
  }
});
