import {cp,mkdir,rm,writeFile} from 'node:fs/promises';
import {readLibrary,archiveIndex} from './edition-library.mjs';
const {editions}=await readLibrary();
await rm('dist',{recursive:true,force:true});
await mkdir('dist');await cp('public','dist',{recursive:true});
await writeFile('dist/briefings.json',JSON.stringify(archiveIndex(editions))+'\n');
console.log(`Static site built with ${editions.length} saved editions.`);
