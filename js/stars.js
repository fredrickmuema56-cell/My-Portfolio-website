/* NEBULA / MUEMa — lightweight animated atmosphere.
   Canvas only: no WebGL, external library, image downloads, or large 3D assets. */
(() => {
  if (document.documentElement.dataset.theme !== 'dark') return;
  const mount = document.getElementById('three-bg');
  if (!mount) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smallScreen = window.matchMedia('(max-width: 640px)').matches;
  const canvas = document.createElement('canvas');
  canvas.className = 'nebula-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  mount.replaceChildren(canvas);
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let w = 0, h = 0, dpr = 1, stars = [], meteors = [], raf = 0, lastMeteor = 0;
  let pointerX = 0, pointerY = 0;
  const count = reduceMotion ? 36 : (smallScreen ? 58 : 115);
  const rand = (a, b) => a + Math.random() * (b - a);

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, smallScreen ? 1 : 1.35);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: rand(.45, 1.45), phase: rand(0, Math.PI * 2),
      speed: rand(.06, .28), depth: rand(.15, 1),
      tint: Math.random() > .82 ? 'gold' : 'cyan'
    }));
    meteors = [];
  }
  function addMeteor() {
    if (meteors.length > (smallScreen ? 1 : 2)) return;
    meteors.push({ x: rand(w * .35, w * 1.05), y: rand(-40, h * .42),
      vx: rand(-4.4, -2.5), vy: rand(2.1, 4.2), life: 0, max: rand(30, 48) });
  }
  function draw(now) {
    ctx.clearRect(0, 0, w, h);
    const driftX = pointerX * 8, driftY = pointerY * 5;
    for (const s of stars) {
      if (!reduceMotion) { s.y += s.speed * .12; if (s.y > h + 2) s.y = -2; }
      const twinkle = reduceMotion ? .5 : .34 + (Math.sin(now * .0012 + s.phase) + 1) * .22;
      const x = s.x + driftX * s.depth, y = s.y + driftY * s.depth;
      ctx.beginPath();
      ctx.fillStyle = s.tint === 'gold' ? `rgba(255,209,138,${twinkle})` : `rgba(165,255,245,${twinkle})`;
      ctx.arc(x, y, s.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduceMotion && now - lastMeteor > (smallScreen ? 9000 : 5600)) {
      addMeteor(); lastMeteor = now;
    }
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i]; m.x += m.vx; m.y += m.vy; m.life++;
      const alpha = Math.max(0, 1 - m.life / m.max);
      const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 10, m.y - m.vy * 10);
      grad.addColorStop(0, `rgba(210,255,251,${alpha * .85})`);
      grad.addColorStop(1, 'rgba(85,244,232,0)');
      ctx.strokeStyle = grad; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * 10, m.y - m.vy * 10); ctx.stroke();
      if (m.life > m.max || m.x < -100 || m.y > h + 100) meteors.splice(i, 1);
    }
    if (!reduceMotion) raf = requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', e => {
    pointerX = (e.clientX / Math.max(1, w) - .5) * 2;
    pointerY = (e.clientY / Math.max(1, h) - .5) * 2;
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else if (!reduceMotion) raf = requestAnimationFrame(draw);
  });
  resize();
  if (reduceMotion) draw(0); else raf = requestAnimationFrame(draw);
})();
