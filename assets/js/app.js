/* ============================================
   app.js - 辛巳学习日志网 主应用
   自然滚动布局 - 借鉴 dscl8404
   依赖: i18n.js
   ============================================ */

(function() {
  'use strict';

  // ==========================================
  // Theme Manager
  // ==========================================
  var Theme = {
    init: function() {
      var saved = localStorage.getItem('theme');
      if (saved) {
        document.body.setAttribute('data-theme', saved);
      } else {
        var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
      }
      this.updateIcon();
    },

    toggle: function() {
      var current = document.body.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      this.updateIcon();
    },

    updateIcon: function() {
      var btn = document.getElementById('theme-toggle');
      if (btn) {
        var isLight = (document.body.getAttribute('data-theme') || 'dark') === 'light';
        btn.innerHTML = isLight ? '🌙' : '☀️';
      }
    }
  };

  // ==========================================
  // Social Icons (official SVGs)
  // ==========================================
  function getSocialIcon(type) {
    var icons = {
      github: '<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
      orcid: '<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.847-1.238-3.722-3.806-3.722h-2.513z"/></svg>',
      gravatar: '<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'
    };
    return icons[type] || icons.gravatar;
  }

  // ==========================================
  // Render Page Content
  // ==========================================
  function renderPage() {
    var lang = I18n.get();

    // Update brand name
    var brand = document.getElementById('nav-brand');
    if (brand) {
      var brandName = I18n.t('profile.title') || I18n.t('profile.name') || '辛巳学习日志网';
      brand.innerHTML = brandName;
    }

    // Update scroll label
    var scrollLabel = document.getElementById('scroll-label');
    if (scrollLabel) {
      scrollLabel.innerHTML = I18n.uiText('scrollDown');
    }

    // Update hero title
    var heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = I18n.t('profile.title') || '辛巳学习日志网';
    }

    // Nav labels
    var navLinks = document.querySelectorAll('.nav-link');
    var navKeys = ['hero', 'sites', 'friends', 'about', 'contact'];
    navLinks.forEach(function(link, i) {
      if (navKeys[i]) {
        link.innerHTML = I18n.uiText('nav.' + navKeys[i]);
      }
    });

    // Social icons
    var socialEl = document.getElementById('hero-social');
    if (socialEl) {
      var socials = I18n.t('profile.social') || [];
      socialEl.innerHTML = socials.map(function(s) {
        return '<a href="' + s.url + '" target="_blank" rel="noopener" class="social-link" title="' + s.name + '">' + getSocialIcon(s.icon) + '</a>';
      }).join('');
    }

    // Neofetch info
    var nfHost = document.getElementById('nf-host');
    if (nfHost) nfHost.innerHTML = lang === 'zh' ? '辛巳' : 'Xinsi';

    var nfMem = document.getElementById('nf-mem');
    if (nfMem) nfMem.innerHTML = lang === 'zh' ? '∞ MB / 永远在学习' : '∞ MB / Always Learning';

    // Hero about section
    var heroAboutBio = document.querySelector('.hero-about-bio');
    if (heroAboutBio) heroAboutBio.innerHTML = I18n.t('about.bio');

    var heroAboutDetails = document.querySelector('.hero-about-details');
    if (heroAboutDetails) {
      var details = I18n.t('about.details') || [];
      heroAboutDetails.innerHTML = details.map(function(d) {
        return '<div class="detail-item"><span class="detail-icon">' + d.icon + '</span><span>' + d.text + '</span></div>';
      }).join('');
    }

    // About section
    var aboutBio = document.querySelector('.about-bio');
    if (aboutBio) aboutBio.innerHTML = I18n.t('about.bio');

    var aboutTitle = document.getElementById('about-title');
    if (aboutTitle) aboutTitle.innerHTML = lang === 'zh' ? '关于我' : 'About Me';

    var skillsTitle = document.getElementById('skills-title');
    if (skillsTitle) skillsTitle.innerHTML = lang === 'zh' ? '技术方向' : 'Skills';

    var copyrightTitle = document.getElementById('copyright-title');
    if (copyrightTitle) copyrightTitle.innerHTML = lang === 'zh' ? '软件著作权' : 'Copyrights';

    var patentTitle = document.getElementById('patent-title');
    if (patentTitle) patentTitle.innerHTML = lang === 'zh' ? '专利' : 'Patents';

    var researchTitle = document.getElementById('research-title');
    if (researchTitle) researchTitle.innerHTML = lang === 'zh' ? '项目与论文' : 'Research';

    var awardsTitle = document.getElementById('awards-title');
    if (awardsTitle) awardsTitle.innerHTML = lang === 'zh' ? '竞赛获奖' : 'Awards';

    var awardsNational = document.getElementById('awards-national');
    if (awardsNational) awardsNational.innerHTML = lang === 'zh' ? '国家级' : 'National';

    var awardsProvince = document.getElementById('awards-province');
    if (awardsProvince) awardsProvince.innerHTML = lang === 'zh' ? '省级/西北赛区' : 'Provincial';

    var awardsSchool = document.getElementById('awards-school');
    if (awardsSchool) awardsSchool.innerHTML = lang === 'zh' ? '校级' : 'University';

    // Details
    var detailsEl = document.querySelector('.about-details');
    if (detailsEl) {
      var details = I18n.t('about.details') || [];
      detailsEl.innerHTML = details.map(function(d) {
        return '<div class="detail-item"><span class="detail-icon">' + d.icon + '</span><span>' + d.text + '</span></div>';
      }).join('');
    }

    // Skills
    var skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
      var skills = I18n.t('about.skills') || [];
      skillsGrid.innerHTML = skills.map(function(s, i) {
        return '<div class="skill-card" style="--delay:' + (i * 0.06) + 's">' +
          '<div class="skill-card-titlebar">' +
            '<span class="mac-dot mac-dot-red"></span>' +
            '<span class="mac-dot mac-dot-yellow"></span>' +
            '<span class="mac-dot mac-dot-green"></span>' +
            '<span class="mac-window-title">' + s.name + '</span>' +
          '</div>' +
          '<div class="skill-card-body">' +
            '<span class="skill-icon">' + s.icon + '</span>' +
            '<div><h3>' + s.name + '</h3><p>' + s.desc + '</p></div>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    // Copyrights
    var copyrightList = document.getElementById('copyright-list');
    if (copyrightList) {
      var cop = I18n.t('about.copyrights') || [];
      copyrightList.innerHTML = cop.map(function(c, i) {
        var n = String(i + 1).padStart(2, '0');
        return '<div class="copyright-item"><span class="copyright-num">' + n + '</span><span>' + c + '</span></div>';
      }).join('');
    }

    // Patents
    var patentList = document.getElementById('patent-list');
    if (patentList) {
      var pat = I18n.t('about.patents') || [];
      patentList.innerHTML = pat.map(function(p) {
        return '<div class="patent-item patent-' + p.status + '"><span class="patent-status">' + p.statusText + '</span><span>' + p.text + '</span></div>';
      }).join('');
    }

    // Research
    var researchList = document.getElementById('research-list');
    if (researchList) {
      var res = I18n.t('about.research') || [];
      researchList.innerHTML = res.map(function(r) {
        return '<div class="research-item"><div class="research-icon">' + r.icon + '</div><div class="research-content"><h4>' + r.title + '</h4><p>' + r.desc + '</p></div></div>';
      }).join('');
    }

    // Awards
    function renderAwards(containerId, items) {
      var container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = items.map(function(a) {
          return '<div class="award-item award-' + a.level + '"><span class="award-medal">' + a.medal + '</span><span class="award-text">' + a.text + '</span></div>';
        }).join('');
      }
    }
    renderAwards('award-list-national', I18n.t('about.awards.national') || []);
    renderAwards('award-list-province', I18n.t('about.awards.province') || []);
    renderAwards('award-list-school', I18n.t('about.awards.school') || []);

    // Friends
    var friendsTitle = document.getElementById('friends-title');
    if (friendsTitle) friendsTitle.innerHTML = lang === 'zh' ? '友情链接' : 'Friend Links';

    var friendsSubtitle = document.getElementById('friends-subtitle');
    if (friendsSubtitle) friendsSubtitle.innerHTML = lang === 'zh' ? '交换友联欢迎联系我' : 'Feel free to exchange links';

    var friendsGrid = document.getElementById('friends-grid');
    if (friendsGrid) {
      var friends = I18n.t('friends') || [];
      friendsGrid.innerHTML = friends.map(function(f) {
        return '<a class="friend-card" href="' + f.url + '" target="_blank" rel="noopener"><img class="friend-icon" src="' + f.icon + '" alt="' + f.name + '"><span class="friend-name">' + f.name + '</span></a>';
      }).join('');
    }

    // Sites
    var sitesTitle = document.getElementById('sites-title');
    if (sitesTitle) sitesTitle.innerHTML = lang === 'zh' ? '个人网站导航' : 'My Sites';

    var sitesSubtitle = document.getElementById('sites-subtitle');
    if (sitesSubtitle) sitesSubtitle.innerHTML = lang === 'zh' ? '我的在线项目与服务' : 'My online projects & services';

    var sitesGrid = document.getElementById('sites-grid');
    if (sitesGrid) {
      var sites = I18n.t('sites') || [];
      sitesGrid.innerHTML = sites.map(function(s, i) {
        return '<a class="site-card" href="' + s.url + '" target="_blank" rel="noopener" data-reveal style="--delay:' + (i * 0.06) + 's">' +
          '<div class="site-card-titlebar">' +
            '<span class="mac-dot mac-dot-red"></span>' +
            '<span class="mac-dot mac-dot-yellow"></span>' +
            '<span class="mac-dot mac-dot-green"></span>' +
            '<span class="mac-window-title">' + s.name + '</span>' +
          '</div>' +
          '<div class="site-card-body">' +
            '<span class="site-icon">' + s.icon + '</span>' +
            '<div><h3>' + s.name + '</h3><p>' + s.desc + '</p></div>' +
          '</div>' +
        '</a>';
      }).join('');
    }

    // Contact
    var contactTitle = document.getElementById('contact-title');
    if (contactTitle) contactTitle.innerHTML = lang === 'zh' ? '联系方式' : 'Contact';

    var contactGrid = document.getElementById('contact-grid');
    if (contactGrid) {
      var contacts = I18n.t('contact') || [];
      contactGrid.innerHTML = contacts.map(function(c, i) {
        return '<div class="contact-card" data-reveal style="--delay:' + (i * 0.06) + 's">' +
          '<div class="contact-card-titlebar">' +
            '<span class="mac-dot mac-dot-red"></span>' +
            '<span class="mac-dot mac-dot-yellow"></span>' +
            '<span class="mac-dot mac-dot-green"></span>' +
          '</div>' +
          '<div class="contact-card-body">' +
            '<h3>' + c.name + '</h3>' +
            '<a href="' + c.url + '" target="_blank" rel="noopener">' + c.url.replace(/https?:\/\//, '') + '</a>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    // Footer
    var icpLink = document.getElementById('icp-link');
    if (icpLink) {
      var icpText = I18n.t('footer.icp');
      if (icpText) icpLink.innerHTML = icpText;
    }

    // Re-initialize reveal for new content
    initReveal();
  }

  // ==========================================
  // Scroll Reveal Animation
  // ==========================================
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add('is-visible');
      return;
    }
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    for (var i = 0; i < els.length; i++) obs.observe(els[i]);
  }

  // ==========================================
  // Navbar scroll effect
  // ==========================================
  function initNavbar() {
    window.addEventListener('scroll', function() {
      var nv = document.getElementById('navbar');
      if (nv) nv.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ==========================================
  // Mobile menu toggle
  // ==========================================
  function initMobileMenu() {
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function() {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
      });
    }
  }

  // ==========================================
  // Language switch
  // ==========================================
  function initLangSwitch() {
    var langBtn = document.getElementById('lang-switch');
    if (langBtn) {
      langBtn.addEventListener('click', function() {
        I18n.toggle();
        I18n.updateHtmlLang();
        renderPage();
        langBtn.innerHTML = I18n.get() === 'zh' ? 'English' : '中文';
      });
    }
  }

  // ==========================================
  // Theme toggle
  // ==========================================
  function initThemeToggle() {
    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function() { Theme.toggle(); });
    }
  }

  // ==========================================
  // Initialize Everything
  // ==========================================
  document.addEventListener('DOMContentLoaded', function() {
    I18n.init();
    Theme.init();

    I18n.load(function() {
      I18n.updateHtmlLang();
      renderPage();
      initReveal();
      initNavbar();
      initMobileMenu();
      initLangSwitch();
      initThemeToggle();
    });
  });

  // Expose globally
  window.Theme = Theme;

})();
