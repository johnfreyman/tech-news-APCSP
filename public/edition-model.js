export const bigIdeas=['Creative Development','Data','Algorithms and Programming','Computer Systems and Networks','Impact of Computing'];
const text=(s,n)=>typeof s==='string'&&s.trim().length>0&&s.length<=n;
const date=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
export function validateEdition(e){
  const errors=[];
  if(!e||e.schemaVersion!==1)return ['Unsupported edition format'];
  if(!date(e.date))errors.push('Invalid edition date');
  if(!text(e.editionId,90))errors.push('Missing edition ID');
  if(!text(e.coverage,150))errors.push('Missing coverage label');
  if(!Array.isArray(e.cards)||e.cards.length<6||e.cards.length>8)return [...errors,'Require 6–8 cards'];
  const ids=new Set();
  for(const c of e.cards){
    if(!c||!text(c.id,80)){errors.push('Missing card ID');continue}
    if(ids.has(c.id))errors.push('Duplicate card ID');ids.add(c.id);
    if(!['news','concept','discussion'].includes(c.type))errors.push('Invalid card type');
    if(!text(c.category,40)||!text(c.headline,120)||!text(c.summary,470))errors.push(`${c.id}: text missing or too long`);
    if(c.type!=='discussion'&&!text(c.whyItMatters,260))errors.push(`${c.id}: missing takeaway`);
    if(c.csp&&(!bigIdeas.includes(c.csp.idea)||!text(c.csp.connection,180)))errors.push(`${c.id}: invalid CSP connection`);
    if(!Array.isArray(c.sources)||c.sources.length<1||c.sources.length>3){errors.push(`${c.id}: missing sources`);continue}
    for(const s of c.sources){
      let url;try{url=new URL(s.url)}catch{}
      if(!url||url.protocol!=='https:'||url.username||url.password)errors.push(`${c.id}: unsafe source URL`);
      if(!text(s.name,80)||!date(s.date)||s.date>e.date)errors.push(`${c.id}: invalid source metadata`);
    }
    if(c.type==='discussion'&&!e.cards.some(x=>x.id===c.relatedCardId&&x.type==='news'))errors.push('Discussion must refer to a news card');
  }
  if(e.cards.filter(c=>c?.type==='discussion').length!==1||e.cards.at(-1)?.type!=='discussion')errors.push('End with exactly one discussion card');
  if(e.cards.filter(c=>c?.type==='concept').length>2)errors.push('At most two concept cards');
  return errors;
}
export const pacificDate=(now=new Date())=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
export function expectedEditionDate(now=new Date()){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(now);
  const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));let d=new Date(`${p.year}-${p.month}-${p.day}T12:00:00Z`);
  if(Number(p.hour)<8)d.setUTCDate(d.getUTCDate()-1);
  while([0,6].includes(d.getUTCDay()))d.setUTCDate(d.getUTCDate()-1);
  return d.toISOString().slice(0,10);
}
