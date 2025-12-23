# Grand Hotel - Culinario Mortales Event Hub

Eine elegante Event-Website für das Krimi-Dinner "Grand Hotel" von Culinario Mortale.

## 🎭 Features

- **Personalisierte Dashboards** für jeden Gast mit individuellem Code
- **Kostüm-Beschreibungen** mit Checkliste für alle 8 Charaktere
- **Spotify Playlist Integration** für atmosphärische 1960er Musik
- **Event-Timeline** mit detailliertem Ablaufplan
- **Direkter Link** zum Culinario Mortale Rollenheft-PDF
- **Rosa/Gold Art Deco Design** inspiriert von den originalen Rollenheftern

## 🏛️ Die 8 Charaktere

1. **Jack O'Connor** (42) - Senator
2. **Madeleine O'Connor** (31) - Senators Ehefrau
3. **Frederic Price** (65) - Hotel-Tycoon & Gastgeber
4. **Dóra Galor-Price** (39) - Schauspiel-Ikone
5. **Olivia Branson** (38) - Britische Porzellan-Erbin
6. **Brigitte Dupont** (34) - Chefredakteurin Modemagazin
7. **Dr. Gustaf Hellström** (37) - Psychiater
8. **Baron Theodor von Gollwitz** (48) - Baron & Talent-Agent

## 🚀 Setup

### 1. Dependencies installieren

```bash
npm install
```

### 2. Development Server starten

```bash
npm run dev
```

### 3. Für Production bauen

```bash
npm run build
```

## ⚙️ Konfiguration

### Zugangscodes & Links einpflegen

Öffne `src/data/codes.js` und trage für jeden Gast ein:

```javascript
'SENATOR-1962': {
  characterId: 'jack-oconnor',
  guestName: 'Max Mustermann',           // Gastname eintragen
  culinarioLink: 'https://...'            // Culinario PDF-Link eintragen
}
```

**WICHTIG:** Du öffnest die Culinario-Links NICHT - sie sind nur zum Weitergeben!

### Event-Details anpassen

Öffne `src/data/timeline.js` und passe Zeiten und Details an dein Event an.

## 📦 GitHub Pages Deployment

### 1. GitHub Repository erstellen

```bash
cd culinario-mortales
git init
git add .
git commit -m "Initial commit: Grand Hotel Event Hub"
git branch -M main
git remote add origin https://github.com/[dein-username]/culinario-mortales.git
git push -u origin main
```

### 2. GitHub Pages aktivieren

1. Gehe zu **Settings → Pages**
2. Unter **Source** wähle: **GitHub Actions**
3. Nach dem Push wird die Website automatisch gebaut und deployed

### 3. Website aufrufen

Nach dem Deployment ist deine Website erreichbar unter:
```
https://[dein-username].github.io/culinario-mortales/
```

## 📧 Codes an Gäste versenden

Beispiel-Nachricht:

```
Hallo [Gastname]!

Du bist eingeladen zum Krimi-Dinner im GRAND HOTEL!

📍 Datum: [Datum]
🕕 Uhrzeit: [Uhrzeit]
📍 Ort: [Adresse]

Dein persönlicher Zugang:
🔑 Code: SENATOR-1962
🌐 Website: https://[username].github.io/culinario-mortales/

Auf der Website findest du:
- Deine Rolle & Kostüm-Beschreibung
- Dein Rollenheft (PDF)
- Event-Timeline
- Atmosphärische Musik

Bitte lies den ersten Abschnitt deines Rollenhefts VOR dem Event!

Bis bald im Grand Hotel! 🎭🥂
```

## 🎨 Technologie

- **Vue 3** - Progressive JavaScript Framework
- **Vite** - Next Generation Frontend Tooling
- **Vue Router** - Official Router for Vue.js
- **Pinia** - State Management
- **GitHub Pages** - Free Hosting

## 📝 Verfügbare Zugangscodes

Die Standard-Codes sind:

- `SENATOR-1962` - Jack O'Connor
- `ROSE-BOUCLE` - Madeleine O'Connor
- `TYCOON-GOLD` - Frederic Price
- `DIVA-PEARLS` - Dóra Galor-Price
- `PORCELAIN-TEA` - Olivia Branson
- `FASHION-SWING` - Brigitte Dupont
- `DOCTOR-HORN` - Gustaf Hellström
- `BARON-SMOKE` - Theodor von Gollwitz

Du kannst diese in `src/data/codes.js` ändern!

## 🎵 Musik

Die Spotify Playlist ist bereits integriert. Du kannst sie in `src/data/music.js` anpassen.

## 🎭 Viel Erfolg!

New York, August 1962 - Eine glamouröse Eröffnungsfeier... und ein mysteriöser Mord.

Wer ist der Täter unter den illustren Gästen?
