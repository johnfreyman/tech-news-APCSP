import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateEdition,expectedEditionDate} from '../public/edition-model.js';
const base=JSON.parse(readFileSync(new URL('../public/edition.json',import.meta.url)));
test('edition has readable, sourced cards',()=>assert.deepEqual(validateEdition(base),[]));
test('reject malformed and unsafe content before publication',()=>{
  for(const mutate of [e=>e.cards[0].sources[0].url='javascript:alert(1)',e=>e.cards[0].headline='x'.repeat(121),e=>e.cards[0].sources=[],e=>e.date='2026-02-30',e=>e.cards.pop(),e=>e.cards[1].id=e.cards[0].id,e=>e.cards.at(-1).relatedCardId='missing',e=>e.cards[0].sources[0].date='2099-01-01']){const e=structuredClone(base);mutate(e);assert.ok(validateEdition(e).length)}
});
test('freshness follows Pacific school mornings and weekends',()=>{
  assert.equal(expectedEditionDate(new Date('2026-09-09T14:59:00Z')),'2026-09-08');
  assert.equal(expectedEditionDate(new Date('2026-09-09T15:00:00Z')),'2026-09-09');
  assert.equal(expectedEditionDate(new Date('2026-09-12T18:00:00Z')),'2026-09-11');
  assert.equal(expectedEditionDate(new Date('2026-09-14T14:59:00Z')),'2026-09-11');
  assert.equal(expectedEditionDate(new Date('2026-11-09T16:00:00Z')),'2026-11-09');
});
