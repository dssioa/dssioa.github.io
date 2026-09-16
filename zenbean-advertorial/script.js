(function () {
  var progressFill = document.getElementById('progressFill');
  var stickyBar = document.getElementById('stickyBar');
  var offerSection = document.getElementById('offer');

  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressFill) progressFill.style.width = pct + '%';
  }

  function updateStickyBar() {
    if (!stickyBar || !offerSection) return;
    var offerTop = offerSection.getBoundingClientRect().top + window.scrollY;
    var pastHero = window.scrollY > window.innerHeight * 0.9;
    var reachedOffer = window.scrollY + window.innerHeight > offerTop;
    if (pastHero && !reachedOffer) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  }

  function onScroll() {
    updateProgress();
    updateStickyBar();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateStickyBar);
  onScroll();

  // Starter kit carousel
  var carousel = document.getElementById('kitCarousel');
  if (carousel) {
    var slides = carousel.querySelectorAll('.kit-slide');
    var dots = carousel.querySelectorAll('.kit-dot');
    var label = document.getElementById('kitSlideLabel');
    var prevBtn = carousel.querySelector('.kit-arrow-prev');
    var nextBtn = carousel.querySelector('.kit-arrow-next');
    var labels = ['K-Cups', 'Ground Bag'];
    var current = 0;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === current);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
      });
      if (label) label.textContent = labels[current] || '';
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(dot.getAttribute('data-slide'), 10));
      });
    });

    // basic swipe support
    var touchStartX = null;
    var track = carousel.querySelector('.kit-carousel-track');
    if (track) {
      track.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });
      track.addEventListener('touchend', function (e) {
        if (touchStartX === null) return;
        var delta = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 40) {
          goTo(delta < 0 ? current + 1 : current - 1);
        }
        touchStartX = null;
      });
    }
  }
})();
