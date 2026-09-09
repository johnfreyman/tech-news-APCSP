import {readLibrary} from './edition-library.mjs';
try{
  const {current,editions}=await readLibrary();
  console.log(`Validated ${current.cards.length} cards for ${current.date} and ${editions.length} archived editions.`);
}catch(error){console.error(error.message);process.exit(1)}
