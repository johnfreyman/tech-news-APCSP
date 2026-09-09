import {archivePage,editionURL,formatEditionDate,isEditionDate} from './edition-model.js';
const $=id=>document.getElementById(id);
const node=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value)n.textContent=value;return n};
let editions=[],limit=10;
function render(){
  const date=$('briefing-date').value,visible=archivePage(editions,{date,limit});
  $('clear-date').hidden=!date;$('show-older').hidden=Boolean(date)||visible.length>=editions.length;
  $('archive-status').textContent=date?`${visible.length?'Briefing for':'No briefing saved for'} ${formatEditionDate(date)}`:`${Math.min(limit,editions.length)} saved ${editions.length===1?'edition':'editions'}${editions.length>limit?` of ${editions.length}`:''}`;
  const sections=visible.map(e=>{
    const section=node('section','edition-group');section.setAttribute('aria-label',formatEditionDate(e.date));
    const heading=node('div','edition-heading'),title=node('h2'),day=node('a','',formatEditionDate(e.date));day.href=editionURL(e.date);title.append(day);
    heading.append(title,node('p','',e.coverage));
    const grid=node('div','preview-grid');
    for(const [i,c] of e.cards.entries()){
      const a=node('a',`mini-card ${c.type}`);a.href=editionURL(e.date,c.id);a.setAttribute('aria-label',`Open ${c.headline} from ${formatEditionDate(e.date)}`);
      const top=node('div','mini-top');top.append(node('span','eyebrow category',c.type==='concept'?'CSP in the Wild':c.category),node('span','ordinal',String(i+1).padStart(2,'0')));
      a.append(top,node('h3','',c.headline),node('p','mini-summary',c.summary),node('span','mini-open','Open story →'));grid.append(a);
    }
    section.append(heading,grid);return section;
  });
  if(!visible.length){const empty=node('div','archive-empty');empty.append(node('h2','',date?'No briefing for this date.':'The archive is just getting started.'),node('p','',date?'Choose another date or select Show recent.':'Published briefings will appear here automatically.'));sections.push(empty)}
  $('briefings').replaceChildren(...sections);
}
async function load(){
  $('retry-archive').hidden=true;$('archive-status').textContent='Loading saved briefings…';
  try{
    const res=await fetch('/briefings.json',{cache:'no-store',signal:AbortSignal.timeout(15000)});if(!res.ok)throw Error('Unavailable');const data=await res.json();
    if(data.schemaVersion!==1||!Array.isArray(data.editions)||data.editions.some(e=>!isEditionDate(e.date)||!Array.isArray(e.cards)))throw Error('Invalid archive');
    editions=data.editions;render();
  }catch{$('archive-status').textContent='Couldn’t load past briefings. Check your connection and try again.';$('retry-archive').hidden=false}
}
$('archive-filters').onsubmit=e=>e.preventDefault();$('briefing-date').onchange=render;
$('clear-date').onclick=()=>{$('briefing-date').value='';limit=10;render()};
$('show-older').onclick=()=>{const previousCount=Math.min(limit,editions.length);limit+=10;render();const firstNew=$('briefings').children[previousCount]?.querySelector('a');firstNew?.focus()};
$('retry-archive').onclick=load;load();
