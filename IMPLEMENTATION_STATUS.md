# Umsetzung der Codeprüfung – 15.09.2026

Referenz: main 1de6a26debf83fdff0dd4f2f16ccc8746cc8d571.
Branch: fix/v1-complete-review. Keine Änderung an main / keine Freigabe für Produktivbetrieb.

## Umgesetzt im Code

| Prüfbericht-IDs | Umsetzung |
|---|---|
| 01–08 | PostgreSQL-Adapter, serverseitige Anmeldung/Rollenprojektion, Schreibrechte, Versionskonflikte, Fehler-Rollback, Importvalidierung, Schutz des eigenen letzten Admins, Exporte ohne Sitzung/Passwörter. Infrastruktur noch einzurichten. |
| 09–19 | Stunden- und Datumsvalidierung, Korrektur/Entfernung, Monatsauswahl, passender CSV-Export, tagweise Fehlbuchungsprüfung, Abschluss/Wiederöffnung, jahresbezogener Urlaub, Abwesenheitsgutschrift, Storno und Nullwerte. |
| 20–30 | Abwesenheitskonflikte, Kapazitätsbestätigung, tagesbezogene Personenanzahl, Bearbeitung von Einsätzen/Phasen, persönliche Planung im Menü, Projektmitgliedschaftsprüfung, Archivierung, eindeutige Projektnummern, lokale Tagesdaten und Direktaktionen. |
| 31–39 | Einheitliche Fristlogik, serverseitiger Aufgabenverlauf, Statusbeschriftung, isolierte Anhänge/Entwürfe, eindeutige projektspezifische Erwähnungen, Aufnahmebeendigung, Materialvalidierung, Teilmengen, Lieferdetails, Filter und Korrektur eigener offener Anforderungen. |
| 40–45 | Geschützte Datei-API bis 20 MB, Vorschau/Download getrennt, Legacy-Service-Worker außer Betrieb, Suche ergänzt, Dialog-Abbruchschutz, Import-URL-/ID-Prüfung, CSV-Formelneutralisierung. |
| 46–54 | Mobile Tabellenkarten, umbrochene Material-/Chatfelder, Langtextregeln, Fokusführung/Labels/Escape, Menü-Schließen, Safe-Area-Anpassungen, Hash-Navigation, Admin-Einrichtungshinweis, präzisere Bezeichnungen. Visuelle Prüfung ausstehend. |

## Bewusste Grenzen, keine als fertig behauptete Live-Funktion

- Die Datenbank ist nicht provisioniert. Vercel-Verbindung liefert keine Teams; eine
  produktive Anmeldung oder echte Dateispeicherung wurde deshalb nicht geprüft.
- Kein lokaler unsicherer Fallback: Ohne Backend zeigt die neue Version einen
  Einrichtungsfehler, statt erneut lokale Demo-Konten zu aktivieren.
- Datenmigration ist als transaktionales Owner-Skript vorbereitet, aber nicht mit deinen
  tatsächlichen lokalen Daten ausgeführt. Bestehende zentrale Nutzdaten werden nicht
  überschrieben. Der V2-Import akzeptiert keine unbekannten Benutzer.
- Sicherungsexport enthält Dateiverweise; komplette Binärsicherung erfolgt über
  PostgreSQL. Aufbewahrung und Wiederherstellung aus serverseitigen Snapshots brauchen
  einen betrieblichen Ablauf. Kein automatisches Löschen eingerichtet.
- Volltextsuche in PDF-Inhalten nicht implementiert; Dateinamen, Projekte, Kontakte,
  Aufgaben, Mitarbeiter, Material und Chat werden durchsucht.
- Einheitliche Symbolsprache noch nicht vollständig: vorhandene Emoji bleiben teilweise
  bestehen. Kein abschließendes Urteil zu Abständen/Design ohne gerenderte Vorschau.
- Native Offlinebearbeitung ist bewusst nicht implementiert; private Geschäftsdaten
  werden nicht im Browsercache dauerhaft hinterlegt.
- Feiertags-/Gutschriftenregeln sind konfigurierbar, aber fachlich noch abzunehmen.

## Prüfung

Automatisierte Tests: Kalender, Jahreswechsel, Stundenvalidierung, Tageskapazität,
Rollenprojektion, Rechteverletzungen, Monatsabschluss-Sperre, Kennworthashing und
DOM-Ansichten aller drei Rollen, Stundenkorrektur, Fehler-Rollback, Nullurlaub sowie
Abbruch/Projektwechsel mit Anhängen und Chatentwürfen.
Build und Syntaxcheck: erforderlich vor PR.

Nicht durchgeführt: echte Datenbankintegration, reale Vercel-Loginabläufe, Netzwerkfehler
während mehrteiliger Dateiübertragung, Lasttest und visuelle Desktop-/Mobilabnahme.
