document.addEventListener('DOMContentLoaded', () => {

  // Lucide Icons initialization
  lucide.createIcons();

  // Navbar scroll animation
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('nav');
  let ticking = false;
  function onScrollNav() {
    const currentScroll = window.scrollY;
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
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.querySelector('i').setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const tagElements = document.querySelectorAll('.tag');
  
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

  // Form Handling
  const contactForm = document.getElementById('contact-form');
  const formContainer = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const subject = contactForm.querySelector('input[placeholder="Project Inquiry"]').value;
      const message = contactForm.querySelector('textarea').value;
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Preparing Email...';

      // Construct mailto link
      const mailtoLink = `mailto:benjaminpradheesh15@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      // Show success message after a short delay
      setTimeout(() => {
        formContainer.innerHTML = `
          <div style="text-align: center; padding: 3rem 0;">
            <div style="width: 4rem; height: 4rem; background: rgba(0, 255, 65, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
              <i data-lucide="check-circle-2" style="color: var(--cyber-primary); width: 2rem; height: 2rem;"></i>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Email Prepared!</h3>
            <p style="color: var(--text-gray);">Your email client should have opened. If not, please contact me directly at benjaminpradheesh15@gmail.com</p>
            <button onclick="location.reload()" style="margin-top: 2rem; background: none; border: none; color: var(--cyber-primary); cursor: pointer; text-decoration: underline;">Send another message</button>
          </div>
        `;
        lucide.createIcons();
      }, 1000);
    });
  }
});
// Prevent right-click context menu
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});