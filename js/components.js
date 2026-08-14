
const NAV_ITEMS = [["index.html", "Home"], ["about.html", "About"], ["skills.html", "Skills"], ["projects.html", "Projects"], ["experience.html", "Experience"], ["certificates.html", "Credentials"], ["gallery.html", "Gallery"], ["cv.html", "CV"], ["contact.html", "Contact"]];
function renderHeader(){
  const host=document.getElementById('site-header');
  if(!host) return;
  host.className='site-header';
  host.innerHTML=`<div class="nav-inner">
    <a class="brand" href="index.html" aria-label="Fredrick Musyoki home">
      <span class="brand-mark" aria-hidden="true"></span>
      <span class="brand-name">FREDRICK MUSYOKI<small>PERSONAL PORTFOLIO</small></span>
    </a>
    <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="nav-links" aria-label="Primary navigation"></nav>
  </div>`;
  const nav=host.querySelector('.nav-links');
  const current=document.body.dataset.page;
  NAV_ITEMS.forEach(([href,label])=>{
    const a=document.createElement('a'); a.href=href; a.textContent=label;
    if(href===current) { a.classList.add('active'); a.setAttribute('aria-current','page'); }
    nav.appendChild(a);
  });
  const toggle=host.querySelector('.nav-toggle');
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  });
  nav.addEventListener('click',e=>{ if(e.target.closest('a')) nav.classList.remove('open'); });
}
function renderFooter(){
  const host=document.getElementById('site-footer'); if(!host) return;
  host.className='site-footer';
  host.innerHTML=`<div class="footer-inner">
    <div class="footer-top">
      <div><a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true"></span><span class="brand-name">FREDRICK MUSYOKI<small>LEARNING / BUILDING / EVOLVING</small></span></a><p class="footer-copy">My portfolio, my progress, and the work I’m building as I grow in technology.</p></div>
      <nav class="footer-links" aria-label="Footer navigation">${NAV_ITEMS.map(([href,label])=>`<a href="${href}">${label}</a>`).join('')}</nav>
    </div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} Fredrick Musyoki. Built with HTML, CSS & vanilla JavaScript.</span><button class="back-top" type="button">Back to top ↑</button></div>
  </div>`;
  host.querySelector('.back-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}
document.addEventListener('DOMContentLoaded',()=>{renderHeader();renderFooter();});
