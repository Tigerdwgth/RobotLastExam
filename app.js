import {initSubmission} from './submission.js?v=20261110-care';
import {transition,settleGrid,openDialog,closeDialog,initMotion,revealMedia} from './motion.js?v=20261021-motion';
import {categories,challenges} from './catalogue.js?v=20261110-care';
import {media} from './media.js?v=20261110-care';
import {renderScoreChart} from './score-chart.js?v=20261110-care';
import {t,english,getLanguage,setLanguage} from './i18n.js?v=20261110-care';
const $=id=>document.getElementById(id);
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const params=new URLSearchParams(location.search);
let category=categories.some(c=>c[0]===params.get('category'))?params.get('category'):'';
let type=['precision','dynamic','combined'].includes(params.get('type'))?params.get('type'):'';
let query=params.get('q')||'';
let visible=[];let timer,searchTimer,slowTimer;
const pausedGifs=new Set(matchMedia('(prefers-reduced-motion: reduce)').matches?['house-gif']:[]);
const allMedia=Object.values(media).flat();
const mediaById=new Map(allMedia.map(m=>[m.id,m]));
const sensitiveMedia=new Set(['whipple','microsurgery','catheter','dentistry','neurosurgery'].flatMap(id=>(media[id]||[]).map(m=>m.id)));
const revealedMedia=new Set();
const loadedImages=new Set();
const featured=new Set(['construction','whipple','home','basketball','volleyball','football','driving']);
const orderRank=c=>c.category==='medical'?2:c.id==='construction'?-3:['infant-care','animal-care','farriery'].includes(c.id)?-2:media[c.id]?-1:0;
const ordered=[...challenges].sort((a,b)=>orderRank(a)-orderRank(b));
const categoryName=id=>categories.find(g=>g[0]===id)[1];
// Search covers both languages, so a query keeps matching after switching.
const haystack=new Map(challenges.map(c=>[c.id,[c.title,english(c.title),c.goal,c.difficulty,...c.abilities,...(media[c.id]||[]).flatMap(m=>[m.title,english(m.title),m.publisher])].join(' ').toLowerCase()]));
const matches=(c,cat,kind,needle)=>(!cat||c.category===cat)&&(!kind||c.type===kind)&&(!needle||haystack.get(c.id).includes(needle));
const image=(src,alt,width,height)=>`<img src="${src}" alt="${alt}" loading="lazy" width="${width}" height="${height}"${loadedImages.has(src)?' class="is-loaded"':''}>`;
function renderMedia(m){
 const title=escapeHTML(t(m.title)),publisher=escapeHTML(m.publisher);
 if(sensitiveMedia.has(m.id)&&!revealedMedia.has(m.id))return `<figure class="media-item"><div class="sensitive-preview"><span class="sensitive-label">${t('手术影像')}</span><p>${t('内容可能引起不适')}</p><button type="button" data-reveal="${m.id}">${t('我已了解，显示内容')} ↗</button></div><figcaption><span class="media-title">${title}</span></figcaption></figure>`;
 if(m.kind==='gif')return `<figure class="media-item"><button class="media-preview gif-preview" data-gif="${m.id}" aria-label="${pausedGifs.has(m.id)?'播放':'暂停'}${title}" aria-pressed="${!pausedGifs.has(m.id)}">${pausedGifs.has(m.id)?`<span class="gif-paused">▶ 播放动图</span>`:image(m.src,title,368,280)}<span class="media-badge">GIF · ${pausedGifs.has(m.id)?'播放':'暂停'}</span></button><figcaption><span class="media-title">${title}</span><span class="media-credit"><a href="${m.url}" target="_blank" rel="noopener noreferrer">${publisher} ↗</a> · <a href="${m.licenseUrl}" target="_blank" rel="noopener noreferrer">${m.license}</a></span></figcaption></figure>`;
 return `<figure class="media-item"><button class="media-preview" data-play="${m.id}" aria-label="${t('播放')}: ${title}">${image(m.thumbnail,title,480,360)}<span class="play-icon" aria-hidden="true">▶</span><span class="media-badge">${t('视频')}</span></button><figcaption><button class="media-title" data-play="${m.id}">${title}</button></figcaption></figure>`;
}
const cardHTML=c=>`<article class="challenge${featured.has(c.id)?' featured':''}${media[c.id]?' has-media':''}" id="${c.id}"><div class="card-meta"><span>${t(categoryName(c.category))}</span></div><h2>${escapeHTML(t(c.title))}</h2>${media[c.id]?`<div class="media-list">${media[c.id].map(renderMedia).join('')}</div>`:''}</article>`;
function markLoaded(img){img.classList.add('is-loaded');loadedImages.add(img.getAttribute('src'));}
function buildCategories(){
 $('categories').innerHTML=[['','所有领域'],...categories].map(([id,name])=>`<button type="button" data-category="${id}" aria-pressed="false">${t(name)}</button>`).join('');
}
// Cards are built once per language; filtering only toggles them so focus, images and reveals persist.
function buildGrid(){
 const grid=$('challenge-grid');
 grid.innerHTML=ordered.map(cardHTML).join('');
 for(const el of grid.children)el.style.viewTransitionName=`card-${el.id}`;
 grid.querySelectorAll('.media-preview img:not(.is-loaded)').forEach(img=>{if(img.complete&&img.naturalWidth)markLoaded(img);});
}
function applyFilter(){
 const needle=query.trim().toLowerCase();
 visible=ordered.filter(c=>matches(c,category,type,needle));
 const shown=new Set(visible.map(c=>c.id));
 for(const el of $('challenge-grid').children)el.hidden=!shown.has(el.id);
 document.querySelectorAll('[data-category]').forEach(b=>{const id=b.dataset.category;b.setAttribute('aria-pressed',String(category===id));b.classList.toggle('is-empty',category!==id&&!ordered.some(c=>matches(c,id,type,needle)));});
 document.querySelectorAll('[data-type]').forEach(b=>{const kind=b.dataset.type;b.setAttribute('aria-pressed',String(type===kind));b.classList.toggle('is-empty',type!==kind&&!ordered.some(c=>matches(c,category,kind,needle)));});
 const filtered=Boolean(category||type||needle);
 $('reset').hidden=!filtered;
 $('result-count').textContent=filtered?(getLanguage()==='en'?`${visible.length} of ${ordered.length}`:`${visible.length} / ${ordered.length} 项`):'';
 $('empty').hidden=visible.length>0;$('export').disabled=!visible.length;$('search-clear').hidden=!query;
 const url=new URL(location.href);url.searchParams.delete('media');for(const [k,v]of[['category',category],['type',type],['q',query]])v?url.searchParams.set(k,v):url.searchParams.delete(k);history.replaceState(null,'',url);
}
// When the reader is already deep in the grid, jump back to its start so the new results are in view.
function filter(){
 const jump=$('challenge-grid').getBoundingClientRect().top<document.querySelector('.controls').getBoundingClientRect().bottom-1;
 transition(()=>{applyFilter();if(jump)scrollTo({top:$('catalogue').getBoundingClientRect().top+scrollY,behavior:'instant'});},jump?'page':'grid');
}
function reset(){category='';type='';query='';$('search').value='';clearTimeout(searchTimer);filter();}
function switchLanguage(next){
 if(next===getLanguage())return;
 transition(()=>{setLanguage(next);applyLanguage();buildCategories();buildGrid();applyFilter();renderScoreChart();},'language');
}
function playVideo(id,origin){
 const m=mediaById.get(id);if(!m||m.kind!=='video'||(sensitiveMedia.has(id)&&!revealedMedia.has(id)))return;
 $('player-title').textContent=t(m.title);$('player-source').textContent=m.publisher;$('original-video').href=m.url;$('player-slow-link').href=m.url;
 const screen=$('player-screen');
 screen.querySelector('iframe')?.remove();
 screen.classList.remove('is-ready','is-slow');
 screen.style.setProperty('--poster',`url("${m.thumbnail}")`);
 const iframe=document.createElement('iframe');
 iframe.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
 iframe.title=t(m.title);iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';
 iframe.addEventListener('load',()=>{clearTimeout(slowTimer);screen.classList.add('is-ready');},{once:true});
 clearTimeout(slowTimer);slowTimer=setTimeout(()=>screen.classList.add('is-slow'),7000);
 screen.append(iframe);
 openDialog($('player-dialog'),origin);
}
document.addEventListener('click',e=>{
 const languageButton=e.target.closest('[data-language]');if(languageButton){switchLanguage(languageButton.dataset.language);return;}
 const c=e.target.closest('[data-category]');if(c){category=c.dataset.category;filter();return;}
 const k=e.target.closest('[data-type]');if(k){type=k.dataset.type;filter();return;}
 const reveal=e.target.closest('[data-reveal]');if(reveal){const id=reveal.dataset.reveal;revealedMedia.add(id);reveal.closest('figure').outerHTML=renderMedia(mediaById.get(id));const preview=document.querySelector(`.media-preview[data-play="${id}"]`);revealMedia(preview);preview.focus({preventScroll:true});return;}
 const p=e.target.closest('[data-play]');if(p){playVideo(p.dataset.play,p.closest('.media-item').querySelector('.media-preview'));return;}
 const g=e.target.closest('[data-gif]');if(g){const id=g.dataset.gif;pausedGifs.has(id)?pausedGifs.delete(id):pausedGifs.add(id);g.closest('figure').outerHTML=renderMedia(mediaById.get(id));document.querySelector(`[data-gif="${id}"]`).focus();}
});
document.addEventListener('load',e=>{if(e.target.matches?.('.media-preview img'))markLoaded(e.target);},true);
document.addEventListener('error',e=>{if(e.target.matches?.('.media-preview img'))markLoaded(e.target);},true);
const search=$('search');
search.value=query;
search.addEventListener('input',e=>{query=search.value;$('search-clear').hidden=!query;if(e.isComposing)return;clearTimeout(searchTimer);searchTimer=setTimeout(filter,140);});
search.addEventListener('compositionend',()=>{query=search.value;clearTimeout(searchTimer);searchTimer=setTimeout(filter,140);});
search.addEventListener('keydown',e=>{
 if(e.isComposing)return;
 if(e.key==='Enter'){clearTimeout(searchTimer);filter();}
 else if(e.key==='Escape'){if(search.value){e.preventDefault();query='';search.value='';clearTimeout(searchTimer);filter();}else search.blur();}
});
$('search-clear').addEventListener('click',()=>{query='';search.value='';clearTimeout(searchTimer);filter();search.focus();});
document.addEventListener('keydown',e=>{
 if(e.key!=='/'||e.metaKey||e.ctrlKey||e.altKey||e.isComposing)return;
 if(document.activeElement?.closest('input,textarea,select,[contenteditable="true"]')||document.querySelector('dialog[open]'))return;
 e.preventDefault();search.focus();
});
$('reset').addEventListener('click',reset);$('empty-reset').addEventListener('click',reset);
$('close-player').addEventListener('click',()=>closeDialog($('player-dialog')));
$('player-dialog').addEventListener('cancel',e=>{e.preventDefault();closeDialog(e.target);});
$('player-dialog').addEventListener('close',()=>{clearTimeout(slowTimer);$('player-screen').querySelector('iframe')?.remove();$('player-screen').classList.remove('is-ready','is-slow');});
$('player-dialog').addEventListener('click',e=>{if(e.target!==$('player-dialog'))return;const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(e.target);});
$('export').addEventListener('click',()=>{const data={title:t('HMF · 人类操作的终极挑战'),challenges:visible.map(c=>({title:t(c.title),field:t(categoryName(c.category)),media:(media[c.id]||[]).map(m=>({title:t(m.title),kind:m.kind,publisher:m.publisher,url:m.url,...(m.license?{license:m.license,licenseUrl:m.licenseUrl}:{})}))}))};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='HMF-challenges.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('toast').textContent=getLanguage()==='en'?`Downloaded ${visible.length} challenges`:`已下载 ${visible.length} 项挑战`;$('toast').classList.add('show');clearTimeout(timer);timer=setTimeout(()=>$('toast').classList.remove('show'),2400);});
const textNodes=[];
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){
 const node=walker.currentNode;
 if(!node.parentElement.closest('script,style,[data-language],#score-chart'))textNodes.push([node,node.textContent]);
}
const attributes=[];
document.querySelectorAll('[placeholder],[aria-label]').forEach(el=>{
 for(const name of ['placeholder','aria-label'])if(el.hasAttribute(name))attributes.push([el,name,el.getAttribute(name)]);
});
function applyLanguage(){
 document.documentElement.lang=getLanguage()==='en'?'en':'zh-CN';
 document.title=t('HMF · 人类操作的终极挑战');
 for(const [node,original] of textNodes)node.textContent=original.replace(original.trim(),t(original.trim()));
 for(const [el,name,original] of attributes)el.setAttribute(name,t(original));
 document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===getLanguage())));
 $('submission-status').textContent='';
 const contact=document.querySelector('.video-submit');
 contact.href='mailto:shijia.ge@hexafuture.cn?subject='+encodeURIComponent(getLanguage()==='en'?'Human Manipulation Frontier · Video review':'人类操作挑战 · 视频审核');
}
applyLanguage();
renderScoreChart();
buildCategories();
buildGrid();
applyFilter();
settleGrid(new Map());

initMotion();

initSubmission();
