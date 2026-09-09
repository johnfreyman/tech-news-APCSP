import {readFile,readdir} from 'node:fs/promises';
import {join} from 'node:path';
import {isDeepStrictEqual} from 'node:util';
import {validateEdition,isEditionDate} from '../public/edition-model.js';

export async function readLibrary(root='public'){
  const current=JSON.parse(await readFile(join(root,'edition.json'),'utf8'));
  const errors=validateEdition(current).map(e=>`Current edition: ${e}`);
  const editions=[];
  for(const file of await readdir(join(root,'editions'))){
    if(!file.endsWith('.json'))continue;
    const date=file.slice(0,-5);
    if(!isEditionDate(date)){errors.push(`Invalid archive filename: ${file}`);continue}
    const edition=JSON.parse(await readFile(join(root,'editions',file),'utf8'));
    errors.push(...validateEdition(edition).map(e=>`${file}: ${e}`));
    if(edition.date!==date)errors.push(`${file}: filename and edition date differ`);
    if(edition.date>current.date)errors.push(`${file}: newer than the current edition`);
    editions.push(edition);
  }
  const saved=editions.find(e=>e.date===current.date);
  if(!saved||!isDeepStrictEqual(saved,current))errors.push('Current edition must have an identical dated archive copy');
  if(errors.length)throw new Error(errors.join('\n'));
  return {current,editions:editions.sort((a,b)=>b.date.localeCompare(a.date))};
}
export function archiveIndex(editions){
  return {schemaVersion:1,editions:editions.map(({date,editionId,coverage,cards})=>({date,editionId,coverage,cards:cards.map(({id,type,category,headline,summary})=>({id,type,category,headline,summary}))}))};
}
