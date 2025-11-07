# Card Sharp - Poker Lessons Website

En moderne, responsiv poker-plattform bygget med Vite, modulær SCSS og lettvekts animasjoner i vanilla JavaScript.

## Prosjektbeskrivelse
Det ble utviklet en statisk flerside-applikasjon som presenterer Card Sharp Zone sitt opplæringstilbud. Landingssiden kombinerer et interaktivt hero-parti der kort flyter i en bane, en «Lessons Zone»-seksjon med modulære kort og en «Signal»-CTA med e-postskjema. En egen `login.html` gir medlemmer tilgang til samme designbibliotek. All logikk håndterer mobil-/desktop-tilpasning, `prefers-reduced-motion` og toggling av navigasjon uten rammeverk.

## Mål
- Automatisere bygg og utrulling til GitHub Pages ved hver push til `main`.
- Sikre konsistent, responsivt UI på tvers av breakpoints ved hjelp av SCSS-moduler og CSS-variabler.
- Gjøre prosjektet enkelt å videreutvikle gjennom tydelig struktur og flerinngangs-build (landing + login).

## Arbeidsflyt
1. **Opprettelse av Vite-prosjektet**
   - Prosjektet ble generert med Vite (ESM) og utvidet med støtte for SCSS, Three.js (for fremtidige 3D-effekter) og Terser.
   - Standard scripts (`npm run dev/build/preview`) ble beholdt slik at utviklere kan starte lokalt med ett kommandooppsett.
2. **Bygging av grensesnittet**
   - `index.html` og `login.html` ble håndkodet med semantiske blokker (header, hero, zone, signal, footer) og tilgjengelighetsattributter.
   - `src/styles` er delt inn i `base/`, `layout/`, `home/` og `login/`, og pakkes via `main.scss` for å holde variabler, miksiner og animasjoner samlet.
   - `src/main.js` styrer hero-orbiten (kardistribusjon, dybde, blur, fokus), respekterer `prefers-reduced-motion` og håndterer mobilmeny.
3. **Optimalisering av byggløp**
   - `vite.config.js` setter `base: '/poker-lessons-web/'` for riktig asset-opplasting på Pages, kjører dev-serveren på port 3000 og registrerer flere HTML-innganger.
   - Bygget minifiseres med Terser og dropper `console.log` i produksjon, mens sourcemaps beholdes for enkel feilsøking.
4. **Oppsett av GitHub Actions-workflow**
   - `.github/workflows/main.yml` kjører på `ubuntu-latest`, sjekker ut repoet, bruker `actions/setup-node@v5`, cacher `npm` og kjører `npm ci` + `npm run build`.
   - `actions/configure-pages`, `upload-pages-artifact` og `deploy-pages` sørger for publisering til Pages-miljøet.
5. **Aktivering av GitHub Pages**
   - Repoet ble konfigurert med Pages-miljøet `github-pages`, og runtime-URL hentes fra `steps.deployment.outputs.page_url`.
   - GitHub sitt innebygde `GITHUB_TOKEN` holder nødvendige rettigheter (contents read, pages write, id-token write) som definert i workflowen.
6. **Testing av leveransen**
   - `git push origin main` utløser pipeline, bygger `dist/` og tilgjengeliggjør filene via Pages.
   - Domenet verifiserer at hero-animasjonen roterer, menyen fungerer på mobil, og «Signal»-skjemaet validerer e-post før innsending.

## Prosjektstruktur og oppstart

**Nøkkelfiler**
- `index.html` – hovedside med hero-bane, lessons-grid og nyhetsbrevseksjon.
- `login.html` – medlemsinnlogging med panel/spotlight-layout som deler komponenter med hovedsiden.
- `src/main.js` – initialiserer hero-orbit og header-toggle og rydder event listeners.
- `src/styles/main.scss` + delene i `base/`, `layout/`, `home/`, `login/`, `pages/` – holder variabler, miksiner, animasjoner og seksjonsspesifikke stiler.
- `src/assets/*.png` – kortsymboler som brukes i cards/hero.
- `.github/workflows/main.yml` – CI/CD-pipelinen mot GitHub Pages.
- `vite.config.js` – base-url, flerinngangskonfigurasjon, build-/serverinnstillinger.

**Lokal kjøring**
1. Installer avhengigheter: `npm install`.
2. Start utviklingsserveren: `npm run dev` (åpner automatisk `http://localhost:3000`).
3. Bygg produksjonsversjonen: `npm run build` (utdata havner i `dist/`).
4. Forhåndsvis produksjonsbygget lokalt: `npm run preview`.

**Tilpasninger**
- Oppdater `base` i `vite.config.js` hvis prosjektet skal hostes under annet underkatalognavn.
- Legg til flere sider ved å definere dem i `rollupOptions.input` og opprette tilhørende HTML/SCSS.
- Global farge-/typografikonfigurasjon styres fra `src/styles/base/_variables.scss` og `_typography.scss`.

## Resultat
- Card Sharp Zone kjører som en statisk Vite-bygd nettside på GitHub Pages uten manuelle deploysteg.
- Hver endring som merges til `main` bygger, tester og publiserer automatisk den ferske `dist/`.
- Koden er rigget for videre utvidelser (flere leksjoner, 3D-animasjoner med Three.js eller autentiseringsflows) uten å endre på CI/CD-oppsettet.

## Kompetansemål

**Driftsstøtte** – utforskning av driftsarkitekturen og pipeline-dokumentasjonen viser hvordan hosting, helmiljø og adgangsstyring er lagt opp (*utforske og beskrive komponenter i en driftsarkitektur*, *gjøre rede for prinsipper og strukturer for skytjenester og virtuelle tjenester*, *planlegge og dokumentere arbeidsprosesser og IT-løsninger*, *forenkle og automatisere arbeidsprosesser i utvikling av IT-løsninger*).

**Brukerstøtte** – README fungerer som brukerrettet veiledning med riktig terminologi og tydelige steg (*kartlegge behovet for og utvikle veiledninger for brukere og kunder*, *bruke og tilpasse kommunikasjonsform og fagterminologi i møte med brukere, kunder og fagmiljø*).

**Utvikling** – prosjektet begrunner teknologivalg, beskriver funksjonelle krav, UI-tilpasninger og versjonskontrollpraksis (*vurdere fordeler og ulemper ved ulike programmeringsspråk og velge og anvende relevante programmeringsspråk og algoritmer i eget arbeid*, *lage og begrunne funksjonelle krav til en IT-løsning basert på behovskartlegging*, *vurdere brukergrensesnitt til IT-tjenester og designe tjenester som er tilpasset brukernes behov*, *gjøre rede for hensikten med teknisk dokumentasjon og utarbeide teknisk dokumentasjon for IT-løsninger*, *beskrive og anvende relevante versjonskontrollsystemer i utviklingsprosjekter*).
