(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let currentGroup = [];
  let currentIndex = 0;

  // Build groups from data-group containers
  const groups = {};
  document.querySelectorAll('[data-group]').forEach((container) => {
    const groupName = container.getAttribute('data-group');
    const items = Array.from(container.querySelectorAll('.grid-item img')).map((img) => ({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || '',
    }));
    groups[groupName] = items;

    Array.from(container.querySelectorAll('.grid-item')).forEach((btn, i) => {
      btn.addEventListener('click', () => openLightbox(groupName, i));
    });
  });

  function openLightbox(groupName, index) {
    currentGroup = groups[groupName];
    currentIndex = index;
    render();
    lightbox.classList.add('open');
  }

  function render() {
    const item = currentGroup[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
  }

  function close() {
    lightbox.classList.remove('open');
  }

  function next() {
    currentIndex = (currentIndex + 1) % currentGroup.length;
    render();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    render();
  }

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
})();
