import {validateEdition,expectedEditionDate,displayRequest,formatEditionDate} from './edition-model.js';
const $=id=>document.getElementById(id);
const request=displayRequest(location.search);
let edition=null,pending=null,index=0,elapsed=0,duration=40;
let playing=!request.archived;
let last=performance.now(),offline=false;
const node=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value)n.textContent=value;return n};

function article(c,i){
  const a=node('article',`story ${c.type}`);a.id=`story-${i}`;a.tabIndex=-1;a.setAttribute('aria-label',`Card ${i+1}: ${c.headline}`);
  const top=node('div','story-top');
  top.append(node('p','eyebrow category',c.type==='concept'?'CSP in the Wild':c.category),node('span','ordinal',String(i+1).padStart(2,'0')));
  a.append(top,node('h2','',c.headline));
  const body=node('div','story-body'),aside=node('aside','takeaway');
  aside.append(node('h3','eyebrow','Why it matters to you'),node('p','',c.whyItMatters));
  body.append(node('p','summary',c.summary),aside);a.append(body);
  const bottom=node('div','story-bottom');
  if(c.csp){const p=node('p','csp');p.append(node('strong','',`${c.csp.idea} · `),document.createTextNode(c.csp.connection));bottom.append(p)}
  const sources=node('div','sources');
  for(const s of c.sources){
    const row=node('div'),link=node('a','',s.name);link.href=s.url;link.target='_blank';link.rel='noopener noreferrer';
    row.append(link,node('span','source-label',` · ${new Date(s.date+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'UTC'})}`));sources.append(row);
  }
  bottom.append(sources);a.append(bottom);return a;
}
function status(){
  if(!edition)return;
  $('edition-date').textContent=formatEditionDate(edition.date);$('edition-date').dateTime=edition.date;
  const stale=!request.archived&&edition.date<expectedEditionDate();
  $('freshness').textContent=request.archived?edition.coverage:offline?'Offline · showing the saved edition':stale?'Latest available edition':edition.coverage;
  $('freshness').classList.toggle('stale',stale||offline);
}
function render(){
  if(!edition)return;
  const a=article(edition.cards[index],index);a.classList.add('enter');$('stage').replaceChildren(a);
  $('counter').textContent=`${String(index+1).padStart(2,'0')} / ${String(edition.cards.length).padStart(2,'0')}`;
  $('dots').replaceChildren(...edition.cards.map((c,i)=>{const b=node('button');b.type='button';b.setAttribute('aria-label',`Card ${i+1}: ${c.headline}`);b.setAttribute('aria-current',String(i===index));b.onclick=()=>{index=i;render()};return b}));
  elapsed=0;status();
}
function save(){if(!request.archived)try{localStorage.setItem('csp-edition-v1',JSON.stringify(edition))}catch{}}
function advance(step){if(!edition)return;index=(index+step+edition.cards.length)%edition.cards.length;if(index===0&&pending){edition=pending;pending=null;save()}render()}
function setPlaying(value){playing=value;$('pause').textContent=playing?'Pause':'Play';$('pause').setAttribute('aria-label',playing?'Pause slideshow':'Play slideshow');$('stage').setAttribute('aria-live',playing?'off':'polite');last=performance.now()}
function unavailable(title,message){
  const a=node('article','story');a.append(node('p','eyebrow',request.archived?'Past briefings':'Connection unavailable'),node('h2','',title),node('p','summary',message));$('stage').replaceChildren(a);
  $('counter').textContent='—';
}
async function readEdition(path){
  const res=await fetch(path,{cache:'no-store',signal:AbortSignal.timeout(15000)});
  if(!res.ok)throw Error('Unavailable');
  const fresh=await res.json();if(validateEdition(fresh).length)throw Error('Invalid edition');return fresh;
}
async function refresh(){
  if(request.archived)return;
  try{
    const fresh=await readEdition('/edition.json');offline=false;
    if(!edition){edition=fresh;save();render()}
    else if(fresh.editionId!==edition.editionId&&fresh.date>=edition.date){if(!playing){edition=fresh;index=0;save();render()}else pending=fresh}
    status();
  }catch{offline=true;if(!edition)unavailable('The brief will be back shortly.','Please check the internet connection. We’ll keep trying automatically.');status()}
}
async function loadArchive(){
  $('archive-view').hidden=false;
  $('archive-label').textContent=request.date?`Viewing ${formatEditionDate(request.date)}`:'Past briefing';
  $('archive-retry').hidden=true;
  if(!request.date){unavailable('That date is not valid.','Choose a date from Past Briefings or return to today’s edition.');return}
  try{
    const saved=await readEdition(`/editions/${request.date}.json`);
    if(saved.date!==request.date)throw Error('Date mismatch');
    edition=saved;index=Math.max(0,edition.cards.findIndex(c=>c.id===request.card));render();
    document.title=`${formatEditionDate(edition.date)} · CSP Daily Brief`;
  }catch{
    unavailable('This briefing isn’t available.','It may not have been published on this date, or the connection may be unavailable. Browse Past Briefings to choose another day.');
    $('archive-retry').hidden=false;
  }
}
if(!request.archived)try{const saved=JSON.parse(localStorage.getItem('csp-edition-v1'));if(!validateEdition(saved).length){edition=saved;offline=true;render()}}catch{}
$('previous').onclick=()=>advance(-1);$('next').onclick=()=>advance(1);$('pause').onclick=()=>setPlaying(!playing);
$('duration').onchange=e=>{duration=Number(e.target.value);elapsed=0};$('archive-retry').onclick=loadArchive;
if(!document.fullscreenEnabled)$('fullscreen').hidden=true;
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{}};
document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen'});
document.addEventListener('keydown',e=>{if(['BUTTON','A','SELECT','INPUT','TEXTAREA'].includes(e.target.tagName)||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();advance(1)}if(e.key==='ArrowLeft'){e.preventDefault();advance(-1)}if(e.code==='Space'){e.preventDefault();setPlaying(!playing)}});
document.addEventListener('visibilitychange',()=>{last=performance.now();if(!document.hidden)refresh()});window.addEventListener('online',refresh);
document.addEventListener('click',e=>{if(e.target.closest('#stage a'))setPlaying(false)});
setInterval(()=>{const now=performance.now();if(edition&&playing&&!document.hidden){elapsed+=Math.min((now-last)/1000,1);if(elapsed>=duration)advance(1)}last=now;$('progress').style.width=`${Math.min(100,elapsed/duration*100)}%`},100);
setPlaying(playing);
if(request.archived)loadArchive();else{setInterval(refresh,60000);refresh()}
window.addEventListener('beforeprint',()=>{if(edition)$('stage').replaceChildren(...edition.cards.map(article))});window.addEventListener('afterprint',render);
