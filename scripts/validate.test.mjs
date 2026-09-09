import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateEdition,expectedEditionDate} from '../public/edition-model.js';
const base=JSON.parse(readFileSync(new URL('../public/edition.json',import.meta.url)));
test('edition has readable, sourced cards',()=>assert.deepEqual(validateEdition(base),[]));
test('reject malformed and unsafe content before publication',()=>{
  for(const mutate of [e=>e.cards[0].sources[0].url='javascript:alert(1)',e=>e.cards[0].headline='x'.repeat(121),e=>e.cards[0].sources=[],e=>e.date='2026-02-30',e=>e.cards.splice(5),e=>e.cards[1].id=e.cards[0].id,e=>e.cards.at(-1).type='discussion',e=>e.cards[0].sources=[null],e=>e.cards[0].sources[0].date='2099-01-01']){const e=structuredClone(base);mutate(e);assert.ok(validateEdition(e).length)}
});
test('freshness follows Pacific school mornings and weekends',()=>{
  assert.equal(expectedEditionDate(new Date('2026-09-09T14:59:00Z')),'2026-09-08');
  assert.equal(expectedEditionDate(new Date('2026-09-09T15:00:00Z')),'2026-09-09');
  assert.equal(expectedEditionDate(new Date('2026-09-12T18:00:00Z')),'2026-09-11');
  assert.equal(expectedEditionDate(new Date('2026-09-14T14:59:00Z')),'2026-09-11');
  assert.equal(expectedEditionDate(new Date('2026-11-09T16:00:00Z')),'2026-11-09');
});

import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {readLibrary,archiveIndex} from './edition-library.mjs';
import {archivePage,displayRequest,editionURL} from '../public/edition-model.js';

test('archive keeps older dates reachable beyond the ten-edition preview',()=>{
  const editions=Array.from({length:12},(_,i)=>({...structuredClone(base),date:`2026-09-${String(i+1).padStart(2,'0')}`}));
  const before=editions.map(e=>e.date);
  assert.equal(archivePage(editions).length,10);
  assert.equal(archivePage(editions)[0].date,'2026-09-12');
  assert.equal(archivePage(editions,{limit:20}).length,12);
  assert.equal(archivePage(editions,{date:'2026-09-01'})[0].date,'2026-09-01');
  assert.deepEqual(archivePage(editions,{date:'2025-01-01'}),[]);
  assert.deepEqual(editions.map(e=>e.date),before);
  const indexed=archiveIndex(editions);
  assert.equal(indexed.editions.length,12);
  assert.equal(indexed.editions[0].cards[0].headline,base.cards[0].headline);
});
test('saved-date links resolve exact cards and never treat invalid dates as live mode',()=>{
  const url=new URL(editionURL('2026-09-08','data & privacy'),'https://example.com');
  assert.deepEqual(displayRequest(url.search),{archived:true,date:'2026-09-08',card:'data & privacy'});
  assert.equal(displayRequest('').archived,false);
  for(const value of ['','../../edition','2026-02-30']){
    assert.deepEqual(displayRequest(`?date=${value}`),{archived:true,date:null,card:null});
  }
});
test('publication requires a valid, identical dated copy and preserves earlier days',async()=>{
  const root=await mkdtemp(join(tmpdir(),'csp-archive-test-'));
  const put=(path,data)=>writeFile(join(root,path),JSON.stringify(data));
  try{
    await mkdir(join(root,'editions'));await put('edition.json',base);
    await assert.rejects(readLibrary(root),/identical dated archive copy/);
    const path=`editions/${base.date}.json`;
    await put(path,base);
    const old={...structuredClone(base),date:'2026-09-07',editionId:'earlier'};
    for(const c of old.cards)for(const s of c.sources)s.date='2026-09-07';
    await put('editions/2026-09-07.json',old);
    assert.deepEqual((await readLibrary(root)).editions.map(e=>e.date),[base.date,'2026-09-07']);
    const mismatch=structuredClone(base);mismatch.cards[0].headline='A different headline';await put(path,mismatch);
    await assert.rejects(readLibrary(root),/identical dated archive copy/);
    await put(path,base);await put('editions/2026-09-07.json',base);
    await assert.rejects(readLibrary(root),/filename and edition date differ/);
  }finally{await rm(root,{recursive:true,force:true})}
});
