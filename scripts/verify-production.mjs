import {readFile} from 'node:fs/promises';
import {isDeepStrictEqual} from 'node:util';

const expected=JSON.parse(await readFile('public/edition.json','utf8'));
const base=process.env.PRODUCTION_BASE_URL || 'https://news.freymiumlabs.com';
const cacheBust=process.env.GITHUB_SHA || Date.now().toString();
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function getJson(path){
  const url=`${base}${path}?v=${cacheBust}`;
  const res=await fetch(url,{headers:{'cache-control':'no-cache'}});
  if(!res.ok)throw new Error(`${url} returned ${res.status}`);
  return res.json();
}
async function verify(){
  const live=await getJson('/edition.json');
  const dated=await getJson(`/editions/${expected.date}.json`);
  const index=await getJson('/briefings.json');
  if(!isDeepStrictEqual(live,expected))throw new Error('Production edition.json does not match the merged edition');
  if(!isDeepStrictEqual(dated,expected))throw new Error('Production dated archive does not match the merged edition');
  const listed=index?.editions?.some(e=>e.date===expected.date&&e.editionId===expected.editionId);
  if(!listed)throw new Error('Production briefings.json does not list the merged date and editionId');
}
let last;
for(let attempt=1;attempt<=20;attempt++){
  try{await verify();console.log(`Production verified: ${expected.editionId}`);process.exit(0)}
  catch(err){last=err;console.log(`Verification attempt ${attempt}/20: ${err.message}`);if(attempt<20)await sleep(15000)}
}
throw last;
