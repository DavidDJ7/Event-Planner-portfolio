// Thamizh Nikazhvigal — Site Scripts

document.addEventListener('DOMContentLoaded', () => {

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });
  }

  // Header scroll
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // Active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header-nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('nav-active');
    }
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Counter animation
  document.querySelectorAll('.stat h3').forEach(counter => {
    const target = parseInt(counter.dataset.count);
    if (!target) return;
    const el = counter;
    const suffix = el.querySelector('.suffix');
    const numEl = suffix ? el : el;
    const finalNum = target;

    const animate = () => {
      let current = 0;
      const step = Math.ceil(finalNum / 60);
      const timer = setInterval(() => {
        current += step;
        if (current >= finalNum) {
          if (suffix) {
            el.childNodes[0].textContent = finalNum;
          } else {
            el.textContent = finalNum;
          }
          clearInterval(timer);
        } else {
          if (suffix) {
            el.childNodes[0].textContent = current;
          } else {
            el.textContent = current;
          }
        }
      }, 25);
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animate(); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });
});
