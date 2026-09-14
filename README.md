# ION BAU – V1 komplett (lokale Testversion)

Diese Version bündelt die vereinbarten V1-Module in einer lokalen Browser-App.

## Start
1. Ordner entpacken.
2. `index.html` öffnen.
3. Testzugänge:
   - Admin: `admin@ionbau.local` / `admin`
   - Büro: `marko@ionbau.local` / `marko`
   - Mitarbeiter: `ivan@ionbau.local` / `ivan`

## Enthalten
- Unternehmensprofil + Logo
- Rollen / Benutzer / Mitarbeiter
- Projekte + Kontakte + Navigation
- Aufgaben + Kommentare + Verlauf
- Projektchat + Pins + Nachricht → Aufgabe/Material
- Stunden (reine Stundenanzahl) + 176 h Soll + Monatsabschluss + CSV
- Urlaub / Krank / Frei
- Mitarbeiterplanung mit mehreren Projekten pro Tag
- Baustellenplanung / Phasen / Personalbedarf
- Materialanforderungen und Statusworkflow
- Projektdokumente mit Standardordnern 01–10 und Mitarbeiterfreigabe
- Projektkontakte und Direktaktionen
- Dashboard + Handlungsbedarf + Suche
- Backup/Restore (JSON)
- responsive Oberfläche; PWA-Dateien liegen bei

## Wichtig
Dies ist weiterhin eine lokale Test-/Prototypversion. Daten liegen im Browser (`localStorage`).
Echte Multi-User-Synchronisierung, sichere serverseitige Authentifizierung, E-Mail-Einladungen,
Push-Benachrichtigungen und Cloud-Dateispeicherung benötigen im nächsten Schritt ein Backend.
