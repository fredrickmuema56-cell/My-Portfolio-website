document.addEventListener('DOMContentLoaded', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // I reveal sections as they enter the viewport so the page feels alive without blocking reading.
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  if (reduced) return;

  // I use a light perspective response on important cards so the interface feels physical without a 3D library.
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) translateZ(8px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  // I give the floating hero labels their own slower movement so the photo and text don't feel like one flat layer.
  document.querySelectorAll('.hero-visual-upgraded').forEach(stage => {
    const layers = stage.querySelectorAll('.glass-float, .floating-chip');
    stage.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      layers.forEach((layer, index) => {
        const depth = index % 2 === 0 ? 12 : 8;
        const lift = index % 2 === 0 ? -5 : 5;
        layer.style.transform = `translate3d(${x * depth}px, ${y * lift}px, 0)`;
      });
    });
    stage.addEventListener('pointerleave', () => {
      layers.forEach(layer => { layer.style.transform = ''; });
    });
  });
});
