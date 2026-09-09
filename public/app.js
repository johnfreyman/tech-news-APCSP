import {validateEdition,expectedEditionDate} from './edition-model.js';
const $=id=>document.getElementById(id);
let edition=null,pending=null,index=0,elapsed=0,duration=40,playing=!matchMedia('(prefers-reduced-motion: reduce)').matches,last=performance.now(),offline=false;
const node=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value)n.textContent=value;return n};
function article(c,i){
  const a=node('article',`story ${c.type}`);a.id='story';a.tabIndex=-1;a.setAttribute('aria-label',`Card ${i+1}: ${c.headline}`);
  const top=node('div','story-top');top.append(node('p','eyebrow category',c.type==='concept'?'CSP in the Wild':c.type==='discussion'?'Let’s talk about it':c.category),node('span','ordinal',String(i+1).padStart(2,'0')));a.append(top,node('h2','',c.headline));
  if(c.type==='discussion')a.append(node('p','summary',c.summary));
  else{const body=node('div','story-body'),aside=node('aside','takeaway');aside.append(node('h3','eyebrow','Why it matters to you'),node('p','',c.whyItMatters));body.append(node('p','summary',c.summary),aside);a.append(body)}
  const bottom=node('div','story-bottom');if(c.csp){const p=node('p','csp');p.append(node('strong','',`${c.csp.idea} · `),document.createTextNode(c.csp.connection));bottom.append(p)}else bottom.append(node('p','csp',c.type==='discussion'?'There is more than one defensible answer. Explain your reasoning.':''));
  const sources=node('div','sources');for(const s of c.sources){const row=node('div'),link=node('a','',s.name);link.href=s.url;link.target='_blank';link.rel='noopener noreferrer';row.append(link,node('span','source-label',` · ${new Date(s.date+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'UTC'})}`));sources.append(row)}bottom.append(sources);a.append(bottom);return a;
}
function status(){if(!edition)return;$('edition-date').textContent=new Date(edition.date+'T12:00:00Z').toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});$('edition-date').dateTime=edition.date;const stale=edition.date<expectedEditionDate();$('freshness').textContent=offline?'Offline · showing the saved edition':stale?'Latest available edition':edition.coverage;$('freshness').classList.toggle('stale',stale||offline)}
function render(){if(!edition)return;const a=article(edition.cards[index],index);a.classList.add('enter');$('stage').replaceChildren(a);$('counter').textContent=`${String(index+1).padStart(2,'0')} / ${String(edition.cards.length).padStart(2,'0')}`;$('dots').replaceChildren(...edition.cards.map((c,i)=>{const b=node('button');b.type='button';b.setAttribute('aria-label',`Card ${i+1}: ${c.headline}`);b.setAttribute('aria-current',String(i===index));b.onclick=()=>{index=i;elapsed=0;render()};return b}));elapsed=0;status()}
function save(){try{localStorage.setItem('csp-edition-v1',JSON.stringify(edition))}catch{}}
function advance(step){if(!edition)return;index=(index+step+edition.cards.length)%edition.cards.length;if(index===0&&pending){edition=pending;pending=null;save()}render()}
function setPlaying(value){playing=value;$('pause').textContent=playing?'Pause':'Play';$('pause').setAttribute('aria-label',playing?'Pause slideshow':'Play slideshow');$('stage').setAttribute('aria-live',playing?'off':'polite');last=performance.now()}
async function refresh(){try{const res=await fetch('/edition.json',{cache:'no-store',signal:AbortSignal.timeout(15000)});if(!res.ok)throw Error('Unavailable');const fresh=await res.json();if(validateEdition(fresh).length)throw Error('Invalid edition');offline=false;if(!edition){edition=fresh;save();render()}else if(fresh.editionId!==edition.editionId&&fresh.date>=edition.date){if(!playing){edition=fresh;index=0;save();render()}else pending=fresh}status()}catch{offline=true;if(!edition){$('story').replaceChildren(node('p','eyebrow','Connection unavailable'),node('h2','','The brief will be back shortly.'),node('p','summary','Please check the internet connection. We’ll keep trying automatically.'))}status()}}
try{const saved=JSON.parse(localStorage.getItem('csp-edition-v1'));if(!validateEdition(saved).length){edition=saved;offline=true;render()}}catch{}
$('previous').onclick=()=>advance(-1);$('next').onclick=()=>advance(1);$('pause').onclick=()=>setPlaying(!playing);$('duration').onchange=e=>{duration=Number(e.target.value);elapsed=0};
if(!document.fullscreenEnabled)$('fullscreen').hidden=true;
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{}};
document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen'});
document.addEventListener('keydown',e=>{if(['BUTTON','A','SELECT','INPUT','TEXTAREA'].includes(e.target.tagName)||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();advance(1)}if(e.key==='ArrowLeft'){e.preventDefault();advance(-1)}if(e.code==='Space'){e.preventDefault();setPlaying(!playing)}});
document.addEventListener('visibilitychange',()=>{last=performance.now();if(!document.hidden)refresh()});window.addEventListener('online',refresh);
document.addEventListener('click',e=>{if(e.target.closest('#stage a'))setPlaying(false)});
setInterval(()=>{const now=performance.now();if(edition&&playing&&!document.hidden){elapsed+=Math.min((now-last)/1000,1);if(elapsed>=duration)advance(1)}last=now;$('progress').style.width=`${Math.min(100,elapsed/duration*100)}%`},100);
setInterval(refresh,60000);setPlaying(playing);refresh();
window.addEventListener('beforeprint',()=>{if(edition)$('stage').replaceChildren(...edition.cards.map(article))});window.addEventListener('afterprint',render);
