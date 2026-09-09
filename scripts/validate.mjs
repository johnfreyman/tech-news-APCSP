import {readFile} from 'node:fs/promises';
import {validateEdition} from '../public/edition-model.js';
const edition=JSON.parse(await readFile('public/edition.json','utf8'));
const errors=validateEdition(edition);if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`Validated ${edition.cards.length} cards for ${edition.date}.`);
