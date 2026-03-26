document.addEventListener('DOMContentLoaded', () => {
    // Make the mail tab open Gmail compose
    const gmailLink = document.getElementById('gmail-link');
    if (gmailLink) {
      gmailLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=benjaminpradheesh15@gmail.com', '_blank');
      });
    }

  const themeEditor = document.getElementById('theme-editor');
  const themeEditorToggle = document.getElementById('theme-editor-toggle');
  const themeEditorPanel = document.getElementById('theme-editor-panel');
  const themeModeButtons = document.querySelectorAll('.theme-mode-btn');
  const themeColorButtons = document.querySelectorAll('.theme-color-btn');

  const applyThemeMode = (mode) => {
    document.body.classList.toggle('light-mode', mode === 'light');
    themeModeButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.themeMode === mode);
    });
    localStorage.setItem('themeMode', mode);
  };

  const applyAccentColor = (accent, accentRgb) => {
    document.documentElement.style.setProperty('--cyber-primary', accent);
    document.documentElement.style.setProperty('--cyber-primary-rgb', accentRgb);
    themeColorButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.accent === accent);
    });
    localStorage.setItem('accentColor', accent);
    localStorage.setItem('accentRgb', accentRgb);
  };

  if (themeEditor && themeEditorToggle && themeEditorPanel) {
    const savedMode = localStorage.getItem('themeMode') || 'dark';
    const savedAccent = localStorage.getItem('accentColor');
    const savedAccentRgb = localStorage.getItem('accentRgb');

    applyThemeMode(savedMode);

    const defaultAccentButton = document.querySelector('.theme-color-btn[data-accent="#00ff41"]') || themeColorButtons[0];
    if (savedAccent && savedAccentRgb) {
      applyAccentColor(savedAccent, savedAccentRgb);
    } else if (defaultAccentButton) {
      applyAccentColor(defaultAccentButton.dataset.accent, defaultAccentButton.dataset.accentRgb);
    }

    themeEditorToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      themeEditor.classList.toggle('open');
      themeEditorPanel.setAttribute('aria-hidden', (!themeEditor.classList.contains('open')).toString());
    });

    themeModeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        applyThemeMode(button.dataset.themeMode);
      });
    });

    themeColorButtons.forEach((button) => {
      button.addEventListener('click', () => {
        applyAccentColor(button.dataset.accent, button.dataset.accentRgb);
      });
    });

    document.addEventListener('click', (event) => {
      if (!themeEditor.contains(event.target)) {
        themeEditor.classList.remove('open');
        themeEditorPanel.setAttribute('aria-hidden', 'true');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        themeEditor.classList.remove('open');
        themeEditorPanel.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Smooth animated scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Lucide Icons initialization
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // Navbar scroll animation
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('nav');
  let ticking = false;
  function onScrollNav() {
    const currentScroll = window.scrollY;
    if (!navbar) {
      ticking = false;
      return;
    }

    if (currentScroll > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (currentScroll > lastScrollY && currentScroll > 100) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }
    lastScrollY = currentScroll;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScrollNav);
      ticking = true;
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.setAttribute('data-lucide', 'x');
        } else {
          icon.setAttribute('data-lucide', 'menu');
        }
      }
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });
  }

  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (!navLinks || !menuToggle) {
        return;
      }

      navLinks.classList.remove('active');
      const menuIcon = menuToggle.querySelector('i');
      if (menuIcon) {
        menuIcon.setAttribute('data-lucide', 'menu');
      }
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const tagElements = document.querySelectorAll('.tag');

  // Bubble interactions for buttons and key cards.
  const bubbleTargets = document.querySelectorAll('.btn, .cyber-card, .project-card, .contact-item, .theme-editor-toggle, .theme-mode-btn, .theme-color-btn');
  bubbleTargets.forEach((target) => {
    target.classList.add('interactive-bubble');
  });

  const spawnRipple = (target, clientX, clientY) => {
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'bubble-ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${clientX - rect.left - size / 2}px`;
    ripple.style.top = `${clientY - rect.top - size / 2}px`;

    target.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  };

  bubbleTargets.forEach((target) => {
    target.addEventListener('pointerdown', (event) => {
      if (event.button !== undefined && event.button !== 0) {
        return;
      }
      spawnRipple(target, event.clientX, event.clientY);
    });
  });
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
    tagElements.forEach(tag => {
      const tagTop = tag.getBoundingClientRect().top;
      if (tagTop < windowHeight - 50) {
        tag.classList.add('animated');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  
});
// Prevent right-click context menu
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});