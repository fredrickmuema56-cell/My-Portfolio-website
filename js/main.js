
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');

  function updateHeader() {
    header?.classList.toggle('scrolled', window.scrollY > 12);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  function openLightbox(src, title, alt = title) {
    if (!lightbox) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxTitle.textContent = title || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.src = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const img = trigger.querySelector('img');
      openLightbox(trigger.dataset.lightbox, trigger.dataset.title, img?.alt || trigger.dataset.title);
    });
  });

  document.querySelectorAll('[data-close-lightbox]').forEach(el => el.addEventListener('click', closeLightbox));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLightbox();
  });

  // I validate the form here first, then let the real form submission go to the email service.
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const errors = { name: '', email: '', message: '' };

      if (!name) errors.name = 'Please enter your name.';
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email.';
      if (!message) errors.message = 'Please enter a message.';

      Object.entries(errors).forEach(([field, text]) => {
        const node = document.querySelector(`[data-error-for="${field}"]`);
        if (node) node.textContent = text;
      });

      if (Object.values(errors).some(Boolean)) return;

      const status = document.getElementById('formStatus');
      if (status) status.textContent = 'Sending your message…';
      form.submit();
    });
  }
});
