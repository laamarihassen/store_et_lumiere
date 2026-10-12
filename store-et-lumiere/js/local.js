/* Browser-local additions: cart, product search, local form feedback.
 * Product pricing/conditional fields are handled by the original APF frontend.
 * No purchase, login or form is submitted to the original WordPress server.
 */
(()=>{'use strict';
const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
const money=n=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(n);
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let sortOrders={};fetch('/data/orders.json').then(r=>r.json()).then(x=>sortOrders=x);
let products=[];fetch('/data/products.json').then(r=>r.json()).then(p=>{products=p;setupSearch();});
let timer,returnFocus;
function toast(text){$('.local-toast')?.remove();const n=document.createElement('div');n.className='local-toast';n.setAttribute('role','status');n.textContent=text;document.body.append(n);clearTimeout(timer);timer=setTimeout(()=>n.remove(),5500);}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('.local-gallery-modal')?.remove();$$('.local-search-results').forEach(x=>x.remove());}});
document.addEventListener('click',e=>{
const gallery=e.target.closest('.woocommerce-product-gallery__trigger');if(gallery){e.preventDefault();e.stopImmediatePropagation();const img=$('.woocommerce-product-gallery__image img');if(img){const d=document.createElement('div');d.className='local-gallery-modal';d.setAttribute('role','dialog');d.setAttribute('aria-label','Image du produit');d.innerHTML=`<button class="local-close" aria-label="Fermer l’image">×</button><img src="${escape(img.src)}" alt="${escape(img.alt)}">`;d.addEventListener('click',()=>d.remove());document.body.append(d);$('.local-close',d).focus();}return;}
},true);
document.addEventListener('change',e=>{if(e.target.matches('.wapf-field-image-swatch input')){const wrap=e.target.closest('.wapf-field-container');let text=$('.local-swatch-label',wrap);if(!text){text=document.createElement('p');text.className='local-swatch-label';wrap.append(text);}text.textContent=e.target.dataset.wapfLabel||'';}});
document.addEventListener('submit',e=>{
const f=e.target;if(f.matches('[data-quote-form]'))return;
e.preventDefault();e.stopImmediatePropagation();
if(f.matches('.cart')){calculatePrice();window.StoreQuote.open(f);return;}
if(f.matches('.dgwt-wcas-search-form,.search-form,[role=search]')){showResults($('input',f));return;}
if(!f.checkValidity()){f.reportValidity();return;}
toast('Ce formulaire n’est pas encore connecté à un service d’envoi. Aucune information n’a été envoyée.');
},true);
function showResults(input){if(!input)return;const parent=input.closest('.dgwt-wcas-search-wrapp')||input.parentElement;parent.style.position='relative';$('.local-search-results',parent)?.remove();const q=input.value.trim().toLocaleLowerCase('fr');if(!q)return;const list=products.filter(p=>p.name.toLocaleLowerCase('fr').includes(q));const d=document.createElement('div');d.className='local-search-results';d.setAttribute('aria-live','polite');d.innerHTML=list.length?list.map(p=>`<a href="${escape(p.url)}"><img src="${escape(p.image)}" alt=""><span>${escape(p.name)}<br><small>à partir de ${money(p.price)}</small></span></a>`).join(''):'<p>Aucun produit trouvé.</p>';parent.append(d);}
function setupSearch(){$$('.dgwt-wcas-search-input,.search-form input[type=search]').forEach(input=>{input.addEventListener('input',()=>showResults(input));input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();showResults(input);}});});}
function setupReviews(){if(window.jQuery?.fn.slick){window.jQuery('.cr-reviews-slider').each(function(){const n=window.jQuery(this);if(!n.hasClass('slick-initialized'))n.slick({slidesToShow:3,slidesToScroll:1,dots:true,arrows:true,adaptiveHeight:true,responsive:[{breakpoint:1024,settings:{slidesToShow:2}},{breakpoint:640,settings:{slidesToShow:1}}]});});}}

function calculatePrice(){
 const form=$('form.cart');if(!form)return;
 const totals=$('.wapf-product-totals',form);if(!totals)return;
 const qty=Math.max(1,Number($('input.qty',form)?.value)||1),base=Number(totals.dataset.productPrice)||0;
 const fields=$$('.wapf-field-number',form).filter(n=>!n.classList.contains('wapf-hide'));
 const values=fields.map(n=>Number($('input[type=number]',n)?.value)||0),area=(values[0]||0)*(values[1]||0);
 const slug=location.pathname.split('/').filter(Boolean).at(-1);
 const rates={'store-jour-nuit':55,'store-deroulant':55,'store-californien':41.67,'moustiquaire':56.67,'store-venitien-en-bois':41.67,'store-venitien-en-aluminium':41.67};
 let cutting=0;const calc=$('.wapf-field-calc',form),active=calc&&!calc.classList.contains('wapf-hide');
 if(active&&rates[slug]){
  if(base===0)cutting=Math.max(60,area*rates[slug]/10000*qty);
  else if(area>=1000)cutting=area<9999?(rates[slug]-base)*qty:(area*rates[slug]/10000-base)*qty;
 }
 let extras=0;$$('select option:checked,input:checked',form).forEach(n=>{const p=Number(n.dataset.wapfPrice)||0;if(n.dataset.wapfPricetype==='qt')extras+=p*qty;else if(n.dataset.wapfPricetype==='fixed')extras+=p;});
 const price=base*qty+cutting+extras;
 if(calc&&active)$$('.wapf-calc-text',calc).forEach(n=>n.textContent=money(cutting));
 const grand=$('.wapf-grand-total',form);if(grand)grand.textContent=money(price);
 return price;
}
// Apply the original dimension/quantity formulas after the field library updates visibility.
document.addEventListener('input',e=>{if(e.target.closest('form.cart'))setTimeout(calculatePrice,0);});
document.addEventListener('change',e=>{if(e.target.closest('form.cart'))setTimeout(calculatePrice,0);});
document.addEventListener('click',e=>{if(e.target.closest('form.cart .quantity'))setTimeout(calculatePrice,0);});


function setupWidgets(){
 $$('.elementor-menu-toggle').forEach(toggle=>{
  const widget=toggle.closest('.elementor-widget-nav-menu'),nav=$('.elementor-nav-menu--dropdown',widget);
  if(!nav)return;const change=()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.classList.toggle('elementor-active',open);toggle.classList.toggle('local-open',open);nav.setAttribute('aria-hidden',String(!open));$$('a',nav).forEach(a=>a.tabIndex=open?0:-1);};
  toggle.addEventListener('click',change);$$('.sub-arrow',nav).forEach(arrow=>{arrow.setAttribute('role','button');arrow.tabIndex=0;arrow.setAttribute('aria-label','Développer les sous-catégories');const expand=e=>{e.preventDefault();e.stopPropagation();const sub=arrow.closest('li').querySelector('ul.sub-menu');if(sub){const open=sub.style.display!=='block';sub.style.display=open?'block':'none';arrow.setAttribute('aria-expanded',String(open));}};arrow.addEventListener('click',expand);arrow.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')expand(e);});});toggle.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();change();}});
 });
 $$('.elementor-slides-wrapper').forEach(slider=>{
  slider.classList.add('local-slider');
  if(window.Swiper&&!slider.swiper)new window.Swiper(slider,{loop:true,speed:500,autoplay:{delay:5000,disableOnInteraction:true,pauseOnMouseEnter:true},navigation:{nextEl:$('.elementor-swiper-button-next',slider),prevEl:$('.elementor-swiper-button-prev',slider)},pagination:{el:$('.swiper-pagination',slider),clickable:true},a11y:{prevSlideMessage:'Previous slide',nextSlideMessage:'Next slide'}});
  const first=$('.elementor-slide-button',slider);if(first&&!first.closest('a')){first.setAttribute('role','link');first.tabIndex=0;first.style.cursor='pointer';first.addEventListener('click',()=>location.href='/boutique/');first.addEventListener('keydown',e=>{if(e.key==='Enter')location.href='/boutique/';});}
 });
 $$('.elementor-tab-title').forEach(title=>{const content=title.nextElementSibling;if(!content)return;title.addEventListener('click',()=>{const active=title.classList.toggle('elementor-active');content.style.display=active?'block':'none';title.setAttribute('aria-expanded',String(active));});});
 $$('.elementor-background-lazyload').forEach(n=>n.classList.remove('elementor-background-lazyload'));
}

function hideOptionPrices(){
 const form=document.querySelector('form.cart');if(!form)return;
 const removeHints=()=>form.querySelectorAll('select option .wapf-pricing-hint').forEach(n=>n.remove());
 removeHints();new MutationObserver(removeHints).observe(form,{childList:true,subtree:true});
}
function setup(){hideOptionPrices();setupWidgets();calculatePrice();setupReviews();$$('form.cart .single_add_to_cart_button').forEach(b=>b.classList.remove('disabled'));const c=document.createElement('button');c.className='local-consent';c.textContent='✓';c.setAttribute('aria-label','Informations sur les cookies');c.addEventListener('click',()=>toast('Aucun suivi publicitaire. Les demandes sont enregistrées uniquement lorsque vous choisissez de les télécharger.'));document.body.append(c);$$('.woocommerce-ordering select').forEach(select=>select.addEventListener('change',()=>{
 const parent=$('ul.products');if(!parent)return;const order=sortOrders[select.value];if(!order?.length){toast('Ce tri est indisponible.');return;}
 const nodes=$$('li.product',parent);nodes.sort((a,b)=>{const path=x=>$('a.woocommerce-LoopProduct-link',x)?.getAttribute('href');const rank=x=>{const i=order.indexOf(path(x));return i<0?999:i;};return rank(a)-rank(b);});nodes.forEach(n=>parent.append(n));
}));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
