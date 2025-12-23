# 📋 Setup-Anleitung für Culinario Mortales Website

## 🎯 Dateien die du noch kopieren musst:

### 1. PDF-Rollenheft (WICHTIG!)

Kopiere die PDF-Dateien in diesen Ordner:
```
/Users/michaelnguyen/VSCode/Culinario Mortales/culinario-mortales/public/pdfs/
```

**Benötigte PDFs:**
- `jack-oconnor.pdf`
- `madeleine-oconnor.pdf`
- `frederic-price.pdf`
- `dora-galor-price.pdf`
- `olivia-branson.pdf`
- `brigitte-dupont.pdf`
- `gustaf-hellstrom.pdf`
- `theodor-von-gollwitz.pdf`

---

### 2. Charakterbilder (Optional, aber empfohlen!)

Speichere die Bilder von https://www.culinario-mortale.de/krimidinner/mord-im-grand-hotel in:
```
/Users/michaelnguyen/VSCode/Culinario Mortales/culinario-mortales/public/images/characters/
```

**Benötigte Bilder:**
- `jack-oconnor.jpg`
- `madeleine-oconnor.jpg`
- `frederic-price.jpg`
- `dora-galor-price.jpg`
- `olivia-branson.jpg`
- `brigitte-dupont.jpg`
- `gustaf-hellstrom.jpg`
- `theodor-von-gollwitz.jpg`

**Falls keine Bilder vorhanden sind:** Die Website zeigt automatisch Emoji-Icons! 🎭

---

### 3. Gastnamen eintragen

Öffne die Datei:
```
src/data/codes.js
```

Trage bei jedem Code den Namen deines Gastes ein:
```javascript
'SENATOR-1962': {
  characterId: 'jack-oconnor',
  guestName: 'Max Mustermann', // ← Hier Name eintragen!
  culinarioLink: '/pdfs/jack-oconnor.pdf'
}
```

---

## 🎵 Spotify Playlist ändern

Öffne:
```
src/data/music.js
```

Ersetze die Test-Playlist mit deiner eigenen:
```javascript
playlistId: 'DEINE_PLAYLIST_ID',
embedUrl: 'https://open.spotify.com/embed/playlist/DEINE_PLAYLIST_ID?utm_source=generator'
```

**Deine Playlist muss öffentlich sein!**

---

## 🚀 Website deployen

1. **Commit und Push:**
```bash
git add .
git commit -m "Füge PDFs und Bilder hinzu"
git push
```

2. **GitHub Actions deployed automatisch!**

3. **Website ist live unter:**
```
https://DEIN-USERNAME.github.io/culinario-mortales/
```

---

## 🧪 Testen

### Lokal testen:
```bash
npm run dev
```

### Test-Login:
- **Code:** `TEST-2024`
- **Charakter:** Max Mustermann

---

## ✅ Checkliste vor dem Event:

- [ ] Alle PDFs kopiert nach `public/pdfs/`
- [ ] Alle Charakterbilder kopiert nach `public/images/characters/` (optional)
- [ ] Gastnamen in `src/data/codes.js` eingetragen
- [ ] Spotify Playlist geändert und auf öffentlich gesetzt
- [ ] Website getestet mit `npm run dev`
- [ ] Alles committed und gepusht
- [ ] GitHub Pages deployment erfolgreich

---

## 🎭 Access Codes für deine Gäste:

1. **SENATOR-1962** → Jack O'Connor
2. **ROSE-BOUCLE** → Madeleine O'Connor
3. **TYCOON-GOLD** → Frederic Price
4. **DIVA-PEARLS** → Dóra Galor-Price
5. **PORCELAIN-TEA** → Olivia Branson
6. **FASHION-SWING** → Brigitte Dupont
7. **DOCTOR-HORN** → Dr. Gustaf Hellström
8. **BARON-SMOKE** → Baron Theodor von Gollwitz

**TEST-CODE:** `TEST-2024` (Nicht an Gäste weitergeben!)

---

## 📞 Hilfe

Bei Problemen:
1. Terminal öffnen
2. `npm run dev` ausführen
3. Fehlermeldungen lesen
4. Browser-Cache leeren (Strg+Shift+R / Cmd+Shift+R)

Viel Erfolg bei deinem Culinario Mortale Abend! 🎉

