(()=>{'use strict';
const menu=document.querySelector('.modern-menu'),nav=document.querySelector('#modern-links');
const close=()=>{menu?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open');};
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('is-open')){close();menu.focus();}});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))close();});
document.querySelectorAll('.modern-header nav a').forEach(a=>{if(a.pathname===location.pathname)a.setAttribute('aria-current','page');});
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('modern-reveal');observer.unobserve(entry.target);}});},{threshold:.1});document.querySelectorAll('#content .elementor-widget-heading,#content ul.products li.product').forEach(n=>observer.observe(n));}
})();
