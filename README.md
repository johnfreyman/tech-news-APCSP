# CSP Daily Brief

Bishop Blanchet High School’s AP CSP classroom news display. Seven story cards by default, with a 40-second timer, a concept card, and a discussion question. Uses the supplied school design system and bear artwork; Ultra and Big Shoulders Display are supplied substitutes for the school’s commercial display fonts.

The site is static and has no AI API key, student accounts, analytics, or database. ChatGPT Work produces editions through the connected GitHub plugin using the teacher’s subscription. Vercel publishes main automatically. The daily task edits only `public/edition.json`.

## Development

Node 22 or later; no npm dependencies. `npm test` checks validation and Pacific-time freshness behavior. `npm run build` validates the edition and copies public assets to dist. `npm run dev` serves the display at http://localhost:4173.

Import this repository into Vercel with framework Other, build command `npm run build`, and output directory `dist`. Add `news.freymiumlabs.com` to the project and configure the DNS value Vercel supplies.

Read [DAILY-EDITOR.md](DAILY-EDITOR.md) for the cloud scheduled-task instructions. Keep the news task separate from the teacher’s personal daily email briefing. Never replace cloud scheduling with an unattended desktop job.

Validation checks format, text length, HTTPS source links, dates, and the discussion reference. It does not establish factual accuracy or source availability. The publishing task must check those before merging. Browser refresh is once per minute, with new editions adopted between loops. On network failure the last saved edition remains visible; the app shell must have loaded first.

The school’s design bundle includes sampled/verified color notes that differ between sections; this project uses its supplied CSS values. Logo files are raster crops, not vector masters. Original brand documentation is in brand/README.md.
