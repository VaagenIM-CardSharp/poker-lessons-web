# Card Sharp - Poker Lessons Website

Card Sharp Zone er en responsiv flerside-nettapplikasjon bygget med Vite, modulær SCSS og lettvekts JavaScript-animasjoner. Løsningen beskriver et kurs- og innholdstilbud for pokeropplæring og inkluderer både en landingsside og en påloggingsside.

## Prosjektbeskrivelse
Prosjektet leverer en statisk front-end med et interaktivt hero-parti, en lessons-seksjon med kortbaserte komponenter og et signal-/CTA-område med e-postskjema. En egen `login.html` bruker samme designbibliotek for å tilby gjenbrukbare komponenter. Front-end-logikken håndterer breakpoints, `prefers-reduced-motion` og mobilmeny uten rammeverk. Dokumentasjonen beskriver også build- og driftsoppsettet slik at løsningen kan repeteres og utvides.

## Mål
- Etablere et repeterbart bygg- og distribusjonsløp via GitHub Pages.
- Holde brukergrensesnittet konsistent på tvers av skjermer gjennom delt SCSS-struktur.
- Legge til rette for videreutvikling ved å dokumentere arkitektur, scripts, konfigurasjon og drift.

## Arbeidsflyt
1. **Prosjektoppsett** – Vite ble brukt som grunnlag. SCSS, Three.js og Terser ble lagt til i `package.json`, mens standard `npm run dev/build/preview`-scripts ble beholdt for enkel lokal kjøring.
2. **Grensesnittutvikling** – `index.html` og `login.html` ble bygget med semantiske blokker og tilgjengelighetsattributter. SCSS-koden ligger i kataloger som speiler domenene (base, layout, home, login, pages) og inngår via `src/styles/main.scss`.
3. **Funksjonell JavaScript** – `src/main.js` styrer hero-orbiten (bane, dybde, fokus), tar hensyn til `prefers-reduced-motion`, og administrerer mobilmenyens åpne-/lukke-tilstand.
4. **Build-konfigurasjon** – `vite.config.js` setter `base: '/poker-lessons-web/'`, definerer flerinngangs-build (landing og login), bruker Terser med `drop_console`, genererer sourcemaps og kjører dev-serveren på port 3000.
5. **GitHub Actions-workflow** – `.github/workflows/main.yml` sjekker ut koden, setter opp Node, kjører `npm ci` og `npm run build`, og bruker de offisielle Pages-actionene til å laste opp og distribuere `dist/`.
6. **Testing og aktivering** – Etter aktivering av GitHub Pages kjøres workflowen ved push til `main`. Testene består av manuell validering av animasjoner, navigasjon og skjema, samt verifikasjon av at Pages-URL-en viser oppdatert bygg.

## Prosjektstruktur og oppstart

**Nøkkelfiler**
- `index.html` – landingssiden med hero-seksjon, lessons-grid og nyhetsbrev.
- `login.html` – separat påloggingsside med delt header-/footer-komponent og spotlight-panel.
- `src/main.js` – initialiserer hero-orbit og header-toggle og rydder eventuelle event listeners.
- `src/styles/main.scss` + delkataloger (`base/`, `layout/`, `home/`, `login/`, `pages/`) – variabler, miksiner, animasjoner og seksjonsspesifikke stiler.
- `src/assets/*.png` – kortsymboler brukt i hero- og cards-komponentene.
- `.github/workflows/main.yml` – CI/CD-definisjon for GitHub Pages.
- `vite.config.js` – base-url, flerinngangsoppsett og build-/serverinnstillinger.

**Lokal kjøring**
1. Installer avhengigheter: `npm install`.
2. Start utviklingsserver: `npm run dev` (åpner `http://localhost:3000`).
3. Prod-bygg: `npm run build` (utdata i `dist/`).
4. Forhåndsvisning av prod-bygg: `npm run preview`.

**Tilpasninger**
- Endre `base` i `vite.config.js` dersom prosjektet skal hostes under et annet katalognavn.
- Legg til flere HTML-innganger ved å oppdatere `rollupOptions.input` og opprette tilhørende filer og stilark.
- Juster globale farger og typografi i `src/styles/base/_variables.scss` og `_typography.scss`.

## Resultat
- Løsningen kjører som et statisk Vite-bygg på GitHub Pages uten manuelle deploysteg.
- Push til `main` utløser bygg og distribusjon av siste `dist/`.
- Arkitekturen er dokumentert slik at nye sider, komponenter eller animasjoner kan legges til uten endringer i CI/CD-løpet.

## Kompetansemål

- **Driftsstøtte**
  - `utforske og beskrive komponenter i en driftsarkitektur` – README skisserer front-end- og distribusjonsarkitekturen (Vite-build, flerinnganger, GitHub Pages).
  - `gjøre rede for prinsipper og strukturer for skytjenester og virtuelle tjenester` – forklarer samspillet mellom GitHub Actions, Pages og tilgangstoken.
  - `planlegge og dokumentere arbeidsprosesser og IT-løsninger` – arbeidsflytseksjonen viser prosessen fra initiering til testing.
  - `forenkle og automatisere arbeidsprosesser i utvikling av IT-løsninger` – CI/CD-konfigurasjonen automatiserer bygg og utrulling for hver push.

- **Brukerstøtte**
  - `kartlegge behovet for og utvikle veiledninger for brukere og kunder` – README fungerer som stegvis veiledning for utviklere og undervisningspersonell.
  - `bruke og tilpasse kommunikasjonsform og fagterminologi i møte med brukere, kunder og fagmiljø` – dokumentasjonen benytter norsk fagspråk og forklarer tekniske elementer uten markedsføring.

- **Utvikling**
  - `vurdere fordeler og ulemper ved ulike programmeringsspråk ...` – beskriver hvorfor Vite, SCSS og vanilla JS (med planlagt Three.js-støtte) er valgt.
  - `lage og begrunne funksjonelle krav til en IT-løsning basert på behovskartlegging` – prosjektskildringen dekker forventede seksjoner og funksjoner (hero, lessons, signal, login).
  - `vurdere brukergrensesnitt til IT-tjenester og designe tjenester som er tilpasset brukernes behov` – redegjør for responsivitet, tilgjengelighet og gjenbruk av komponenter.
  - `gjøre rede for hensikten med teknisk dokumentasjon og utarbeide teknisk dokumentasjon for IT-løsninger` – README er strukturert teknisk dokumentasjon med fokus på arkitektur og drift.
  - `beskrive og anvende relevante versjonskontrollsystemer i utviklingsprosjekter` – prosjektet illustrerer GitHub-arbeidsflyt med Actions og Pages koblet til `main`.
