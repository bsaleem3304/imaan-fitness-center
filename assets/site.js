// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function() {
      menu.classList.toggle('open');
      burger.textContent = menu.classList.contains('open') ? '✕ Close' : '☰ Menu';
    });
  }

  // Donate card selection
  document.querySelectorAll('.donate-card').forEach(card => {
    card.addEventListener('click', function() {
      document.querySelectorAll('.donate-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // Amount buttons
  document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const cta = document.querySelector('.donate-cta-btn');
      if (cta) cta.textContent = 'Complete Donation — ' + this.textContent;
    });
  });

  // Newsletter
  const nlForm = document.getElementById('newsletterForm');
  if (nlForm) {
    nlForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('JazakAllah khayran! You have been subscribed. May Allah bless you.');
      this.reset();
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm && !contactForm.action.includes('formspree')) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you! We will respond within 2-3 business days.');
      this.reset();
    });
  }

  // Scroll shadow on nav
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', function() {
    if (nav) nav.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(0,0,0,0.08)' : 'none';
  });

  // Set current year
  const yr = document.getElementById('currentYear');
  if (yr) yr.textContent = new Date().getFullYear();

  // ═══ THEME TOGGLE #2 ═══
  const themeToggle = document.getElementById('themeToggle');
  const moonIcon = document.querySelector('.theme-icon-moon');
  const sunIcon = document.querySelector('.theme-icon-sun');
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ifc-theme', theme);
    sessionStorage.setItem('ifc-theme-toggled', 'true');
    sessionStorage.removeItem('donationPopupClosed');
    if (moonIcon && sunIcon) {
      if (theme === 'light') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
      } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
      }
    }
  }
  
  // Always start with dark mode by default
  // Only load saved theme from localStorage if user has toggled the theme in this session
  let currentTheme = 'dark';
  if (sessionStorage.getItem('ifc-theme-toggled') === 'true') {
    const savedTheme = localStorage.getItem('ifc-theme');
    if (savedTheme) {
      currentTheme = savedTheme;
    }
  }
  
  // Apply the determined theme
  applyTheme(currentTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ═══ SEARCH BAR #1 ═══
  const searchBtn = document.getElementById('navSearchBtn');
  const searchInput = document.getElementById('navSearchInput');
  
  function doSearch() {
    const q = searchInput ? searchInput.value.trim() : '';
    if (!q) return;
    // Simple on-site search - redirect to a search results concept
    const pages = [
      { title: 'Knowing Our Creator — 99 Names', url: 'knowledge/names-of-allah/index.html', keywords: 'allah names quran arabic study' },
      { title: 'Programs', url: 'programs/index.html', keywords: 'classes courses programs' },
      { title: 'Tajweed Studies', url: 'programs/tajweed/index.html', keywords: 'tajweed quran recitation' },
      { title: 'Arabic Courses', url: 'programs/arabic/index.html', keywords: 'arabic language' },
      { title: 'Donate', url: 'donate/index.html', keywords: 'donate sadaqa charity' },
      { title: 'Volunteer', url: 'volunteer/index.html', keywords: 'volunteer help contribute' },
      { title: 'Contact', url: 'contact/index.html', keywords: 'contact email phone' },
    ];
    const ql = q.toLowerCase();
    const match = pages.find(p => p.keywords.includes(ql) || p.title.toLowerCase().includes(ql));
    if (match) {
      // Determine relative path
      const base = window.location.pathname.includes('/login/') || window.location.pathname.includes('/programs/') || window.location.pathname.includes('/knowledge/') ? '../' : '';
      window.location.href = base + match.url;
    } else {
      alert('Search results for "' + q + '" — full search coming soon!\n\nTry: programs, tajweed, arabic, donate, volunteer, contact, or names of Allah');
    }
  }
  
  if (searchBtn) searchBtn.addEventListener('click', doSearch);
  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') doSearch();
    });
  }

  // ═══ ROTATING BANNER #4 ═══
  const rotatingBanner = document.getElementById('rotatingBanner');
  const rotatingClose = document.getElementById('rotatingClose');
  const rotatingMsgs = document.querySelectorAll('.rotating-msg');
  
  if (rotatingMsgs.length > 0) {
    let currentMsg = 0;
    function showNextMsg() {
      rotatingMsgs[currentMsg].classList.remove('active');
      currentMsg = (currentMsg + 1) % rotatingMsgs.length;
      rotatingMsgs[currentMsg].classList.add('active');
    }
    setInterval(showNextMsg, 4000);
  }
  
  if (rotatingClose && rotatingBanner) {
    rotatingClose.addEventListener('click', function() {
      rotatingBanner.classList.add('hidden');
      sessionStorage.setItem('ifc-banner-closed', '1');
    });
    // Check if previously closed this session
    if (sessionStorage.getItem('ifc-banner-closed')) {
      rotatingBanner.classList.add('hidden');
    }
  }

});
