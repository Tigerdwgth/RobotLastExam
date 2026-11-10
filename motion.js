// Native motion: content hierarchy, filter continuity, dialog continuity and playback feedback.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const phone=matchMedia('(max-width: 640px)');
const ease='cubic-bezier(.22,1,.36,1)';
const seen=new Set();
const closing=new Set();
const origins=new WeakMap();
let transitionToken=0;
const inView=rect=>rect.width>0&&rect.bottom>0&&rect.top<innerHeight;
export function enter(el,delay=0,distance=18){
 if(reduced.matches)return;
 el.animate([{opacity:0,transform:`translateY(${distance}px)`},{opacity:1,transform:'translateY(0)'}],{duration:620,delay,easing:ease,fill:'backwards'});
}
const observer=new IntersectionObserver(entries=>{
 let order=0;
 for(const entry of entries){
  if(!entry.isIntersecting)continue;
  const el=entry.target;
  if(!seen.has(el.id)){enter(el,Math.min(order++,3)*55);seen.add(el.id);}
  observer.unobserve(el);
 }
},{threshold:.08});
const cards=()=>document.querySelectorAll('.challenge:not([hidden])');
function refreshReveal(){
 observer.disconnect();
 for(const el of cards()){
  if(inView(el.getBoundingClientRect()))seen.add(el.id);
  else if(!seen.has(el.id))observer.observe(el);
 }
}
export function captureGrid(){
 return new Map([...cards()].map(el=>[el.id,el.getBoundingClientRect()]));
}
export function settleGrid(before){
 observer.disconnect();
 let order=0;
 for(const el of cards()){
  const rect=el.getBoundingClientRect();
  if(inView(rect)){
   const old=before.get(el.id);
   if(!reduced.matches&&old&&inView(old)){
    const x=old.x-rect.x,y=old.y-rect.y;
    if(x||y)el.animate([{transform:`translate(${x}px,${y}px)`},{transform:'translate(0,0)'}],{duration:480,easing:ease});
   }else enter(el,Math.min(order++,3)*45,14);
   seen.add(el.id);
  }else if(!seen.has(el.id))observer.observe(el);
 }
 syncTabs();
}
// Runs a DOM update as one continuous change: View Transitions where supported, FLIP otherwise.
// scope: 'grid' morphs cards in place, 'page' crossfades after a scroll jump, 'language' crossfades copy.
export function transition(update,scope='grid'){
 if(reduced.matches){update();refreshReveal();syncTabs();return;}
 if(document.startViewTransition){
  const root=document.documentElement,token=++transitionToken;
  root.dataset.vt=scope;
  const vt=document.startViewTransition(update);
  vt.ready.catch(()=>{});
  vt.updateCallbackDone.then(()=>{refreshReveal();syncTabs();},()=>{});
  vt.finished.catch(()=>{}).finally(()=>{if(token===transitionToken)delete root.dataset.vt;});
  return;
 }
 if(scope==='language'){update();languageMotion();refreshReveal();syncTabs();return;}
 const before=scope==='page'?new Map():captureGrid();
 update();settleGrid(before);
}
export function syncTabs(){
 const tabs=document.querySelector('.type-tabs');
 const active=tabs.querySelector('[aria-pressed="true"]');
 if(!active)return;
 tabs.style.setProperty('--tab-x',`${active.offsetLeft}px`);
 tabs.style.setProperty('--tab-width',`${active.offsetWidth}px`);
 tabs.classList.add('motion-tabs');
}
export function languageMotion(){
 for(const selector of ['.intro-copy','.score-heading','.chart-label','.controls','.results']){
  document.querySelectorAll(selector).forEach(el=>enter(el,0,5));
 }
}
function originRect(origin){
 const rect=origin?.isConnected&&origin.getBoundingClientRect();
 return rect&&inView(rect)?rect:null;
}
function fromOrigin(dialog,rect){
 const to=dialog.getBoundingClientRect();
 const dx=rect.left+rect.width/2-(to.left+to.width/2),dy=rect.top+rect.height/2-(to.top+to.height/2);
 return `translate(${dx}px,${dy}px) scale(${Math.max(.2,rect.width/to.width)})`;
}
const isSheet=dialog=>'sheet' in dialog.dataset&&phone.matches;
// Opens a modal dialog that grows out of the element that opened it (or rises as a sheet on phones).
export function openDialog(dialog,origin){
 origins.set(dialog,origin);
 dialog.showModal();
 if(reduced.matches)return;
 if(isSheet(dialog)){dialog.animate([{transform:'translateY(100%)'},{transform:'translateY(0)'}],{duration:520,easing:ease});return;}
 const rect=originRect(origin);
 if(rect)dialog.animate([{opacity:0,transform:fromOrigin(dialog,rect)},{opacity:1,offset:.3},{opacity:1,transform:'none'}],{duration:560,easing:ease});
 else dialog.animate([{opacity:0,transform:'translateY(18px) scale(.975)'},{opacity:1,transform:'none'}],{duration:380,easing:ease});
}
export async function closeDialog(dialog){
 if(closing.has(dialog)||!dialog.open)return;
 closing.add(dialog);dialog.classList.add('is-closing');
 try{
  if(!reduced.matches){
   const sheet=isSheet(dialog),rect=sheet?null:originRect(origins.get(dialog));
   const frames=sheet?[{transform:'translateY(0)'},{transform:'translateY(100%)'}]
    :rect?[{opacity:1,transform:'none'},{opacity:1,offset:.55},{opacity:0,transform:fromOrigin(dialog,rect)}]
    :[{opacity:1,transform:'none'},{opacity:0,transform:'translateY(8px) scale(.985)'}];
   await dialog.animate(frames,{duration:sheet?300:rect?340:170,easing:sheet||rect?'cubic-bezier(.4,0,.7,1)':'ease-out',fill:'forwards'}).finished;
  }
  dialog.close();
 }finally{
  dialog.getAnimations().forEach(a=>a.cancel());
  dialog.classList.remove('is-closing');closing.delete(dialog);
 }
}
export function nudge(el){
 if(!el||reduced.matches)return;
 el.animate([{translate:'0'},{translate:'-6px'},{translate:'5px'},{translate:'-3px'},{translate:'0'}],{duration:360,easing:'ease-in-out'});
}
export function pulse(el){
 if(reduced.matches)return;
 el.animate([{opacity:0,translate:'0 4px'},{opacity:1,translate:'0 0'}],{duration:320,easing:ease});
}
export function revealMedia(el){
 if(!el||reduced.matches)return;
 el.animate([{filter:'blur(18px) saturate(.3)',opacity:.4},{filter:'blur(0) saturate(1)',opacity:1}],{duration:700,easing:ease});
}
// Draws the score chart once, the first time it scrolls into view.
function revealChart(chart){
 if(reduced.matches)return;
 const io=new IntersectionObserver(([entry])=>{
  if(!entry.isIntersecting)return;
  io.disconnect();
  chart.querySelectorAll('.chart-grid-line').forEach((line,i)=>line.animate([{clipPath:'inset(-12px 100% -12px -40px)'},{clipPath:'inset(-12px 0 -12px -40px)'}],{duration:760,delay:i*50,easing:ease,fill:'backwards'}));
  chart.querySelectorAll('.chart-item').forEach((item,i)=>{
   const bar=item.querySelector('.chart-bar'),delay=260+i*70;
   bar.animate(bar.classList.contains('unknown')
    ?[{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0 0 0 0)'}]
    :[{clipPath:'inset(-40px 50% 0 50%)'},{clipPath:'inset(-40px 0 0 0)'}],{duration:bar.classList.contains('unknown')?900:520,delay,easing:ease,fill:'backwards'});
   item.querySelector('.chart-value').animate([{opacity:0,translate:'0 6px'},{opacity:1,translate:'0 0'}],{duration:480,delay:delay+(bar.classList.contains('unknown')?520:180),easing:ease,fill:'backwards'});
   item.querySelector('.chart-label').animate([{opacity:0,translate:'0 6px'},{opacity:1,translate:'0 0'}],{duration:520,delay:delay-60,easing:ease,fill:'backwards'});
  });
 },{threshold:.35});
 io.observe(chart);
}
function watchStuck(){
 const controls=document.querySelector('.controls'),catalogue=document.getElementById('catalogue');
 let frame=0;
 const update=()=>{frame=0;controls.classList.toggle('is-stuck',catalogue.getBoundingClientRect().top<-1);};
 addEventListener('scroll',()=>{frame||=requestAnimationFrame(update);},{passive:true});
 update();
}
export function initMotion(){
 [['.header',0,6],['.intro h1',90,22],['.intro h1 span',170,22],['.hero-subtitle',260,14],['.scoreboard',340,18]].forEach(([selector,delay,distance])=>{
  const el=document.querySelector(selector);
  if(el&&inView(el.getBoundingClientRect()))enter(el,delay,distance);
 });
 const tabs=document.querySelector('.type-tabs');
 new ResizeObserver(syncTabs).observe(tabs);
 document.fonts.ready.then(syncTabs);
 reduced.addEventListener('change',()=>{if(reduced.matches)document.getAnimations().filter(a=>a.effect?.getTiming().iterations!==Infinity).forEach(a=>a.finish());});
 // Fade the hero in once its image is decoded, instead of letting it pop in mid-animation.
 const intro=document.querySelector('.intro'),hero=new Image();
 hero.src='./assets/frontier-hero.webp';
 hero.decode().catch(()=>{}).finally(()=>intro.classList.add('hero-ready'));
 watchStuck();
 revealChart(document.getElementById('score-chart'));
}
