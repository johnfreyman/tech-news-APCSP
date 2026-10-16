# CSP Daily Brief

Bishop Blanchet High School’s AP CSP classroom news display. Nine story cards by default (eight to ten allowed), with a 40-second timer and an optional concept card. No discussion cards. Uses the supplied school design system and bear artwork; Ultra and Big Shoulders Display are supplied substitutes for the school’s commercial display fonts.

The site is static and has no AI API key, student accounts, analytics, or database. A Claude scheduled task produces editions on weekday mornings using the teacher’s Claude subscription and the connected GitHub tools. Vercel publishes main automatically. The daily task updates `public/edition.json` and an identical `public/editions/YYYY-MM-DD.json`. Each date is retained in Git; no older editions are automatically deleted.

## Development

Node 22 or later; no npm dependencies. `npm test` checks validation, Pacific-time freshness, dated navigation and archive integrity. `npm run build` validates the edition and copies public assets to dist, then generates `dist/briefings.json` from the dated files. `npm run dev` serves the display at http://localhost:4173.

Import this repository into Vercel with framework Other, build command `npm run build`, and output directory `dist`. Add `news.freymiumlabs.com` to the project and configure the DNS value Vercel supplies.

Read [DAILY-EDITOR.md](DAILY-EDITOR.md) for the cloud scheduled-task instructions. Keep the news task separate from the teacher’s personal daily email briefing. Never replace cloud scheduling with an unattended desktop job.

Validation checks format, text length, HTTPS source links, dates, supported news/concept types, and agreement between the current and dated copies. It does not establish factual accuracy or source availability. The publishing task must check those before merging. Browser refresh is once per minute, with new editions adopted between loops. On network failure the last saved edition remains visible; the app shell must have loaded first.

The school’s design bundle includes sampled/verified color notes that differ between sections; this project uses its supplied CSS values. Logo files are raster crops, not vector masters. Original brand documentation is in brand/README.md.

## Past Briefings

`/archive.html` shows miniature story previews for the latest 10 saved editions. A date picker opens any saved date, and Show older briefings reveals earlier groups. Each miniature links to `/?date=YYYY-MM-DD&card=card-id`, opening that exact story paused. Archived displays never automatically switch to today or overwrite the current-edition device cache. Back to today returns to the live slideshow.

Archive collection begins with the September 8, 2026 edition; dates without an edition show an empty state. The build fails if the current edition lacks an identical dated copy, a filename disagrees with its date, or an archived edition is invalid. This keeps each new edition discoverable through its previews and permanent date link.
