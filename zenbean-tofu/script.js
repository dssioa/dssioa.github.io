// Zenbean TOFU page — minimal JS
// One orchestrated entrance on the hero only. No per-card scroll animations,
// no hover-triggered motion beyond the CSS button transitions already in place.

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const targets = hero.querySelectorAll('h1, .sub, .btn, .hero-media');
    targets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = 'opacity 500ms ease, transform 500ms ease';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 80 + i * 90);
    });
  }

  // Offer carousel: K-Cups / Ground format switch
  const slides = [
    { img: 'assets/img/offer-kcups.svg', alt: 'Gentle Coffee Starter Kit, K-Cups format', label: 'K-Cups' },
    { img: 'assets/img/offer-ground.svg', alt: 'Gentle Coffee Starter Kit, Ground format', label: 'Ground' },
  ];

  const slideImg = document.getElementById('offer-slide-img');
  const formatLabel = document.getElementById('offer-format');
  const dots = document.querySelectorAll('.offer-dots .dot');
  const arrows = document.querySelectorAll('.offer-arrow');
  let current = 0;

  function renderSlide(index) {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    if (slideImg) {
      slideImg.style.opacity = '0';
      setTimeout(() => {
        slideImg.src = slide.img;
        slideImg.alt = slide.alt;
        slideImg.style.opacity = '1';
      }, 120);
    }
    if (formatLabel) formatLabel.textContent = slide.label;
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => renderSlide(parseInt(dot.dataset.slide, 10)));
  });

  arrows.forEach((arrow) => {
    arrow.addEventListener('click', () => renderSlide(current + parseInt(arrow.dataset.dir, 10)));
  });

  // FAQ category tabs
  const faqTabs = document.querySelectorAll('.faq-tab');
  const faqGroups = document.querySelectorAll('.faq-group');

  faqTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;

      faqTabs.forEach((t) => t.classList.toggle('is-active', t === tab));
      faqGroups.forEach((group) => {
        group.classList.toggle('is-active', group.dataset.category === category);
      });
    });
  });
});
