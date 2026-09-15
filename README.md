> Integration checkpoint: read INTEGRATION_STATUS.md first. The existing Supabase backend uses a different schema; do not run the legacy database setup against it.

# ION BAU V1.1 – gemeinsames System (Implementierungsstand)

Die bestehende Oberfläche wurde um Server-Anmeldung, zentrale PostgreSQL-Speicherung,
Rollenprüfung, geschützte Dateien sowie Korrektur- und Planungsabläufe erweitert.
Dieser Branch ist **noch nicht für den Live-Betrieb freigegeben**: Die reale
PostgreSQL-Verbindung und das Vercel-Deployment müssen eingerichtet und geprüft werden.
Die alte lokale Testversion auf main bleibt unverändert.

## Einrichtung durch den Kontoinhaber

1. PostgreSQL-Datenbank im gewünschten Vercel-Team anlegen und `DATABASE_URL` als
   geheime Umgebungsvariable für die **geschützte Preview** setzen. Preview und
   Produktion brauchen getrennte Datenbanken.
2. Node 22 oder neuer verwenden; `npm ci`.
3. `ADMIN_EMAIL` und ein mindestens 12 Zeichen langes `ADMIN_PASSWORD` nur in einer
   sicheren lokalen Umgebung setzen. `node scripts/setup.cjs` ausführen. Das Skript
   erstellt Tabellen und einen ersten Admin, überschreibt aber keine vorhandene Firma.
   ADMIN_PASSWORD anschließend aus der Umgebung entfernen. Nicht im Chat teilen.
4. Build: `npm run build`. Ausgabe `public/`; Vercel-Funktionen in `api/`.
   `vercel.json` enthält diese Einstellungen. Alte lokale Demo-Passwörter funktionieren
   im neuen System nicht.
5. Vercel-Authentifizierung für die Testumgebung beibehalten. Erst die echte Vorschau
   mit Admin-, Büro- und Mitarbeiterkonten testen; danach über Freigabe entscheiden.

Lokal: `npm start` (Port 8766; benötigt dieselbe Datenbank-Konfiguration).
Tests: `npm test`. Tests verwenden isolierte Fixtures und simulierte API-Antworten;
sie ersetzen keine echte PostgreSQL-/Vercel-Abnahme.

## Daten und Berechtigungen

- HttpOnly-Sitzung, SameSite=Strict, Ablauf nach acht Stunden; Secure-Cookie auf Vercel.
- Passwörter gesalzen mit scrypt; keine Passwort-Hashes in Clientdaten/Exports.
- Rollenprüfung auf dem Server; Mitarbeiter erhalten nur freigegebene Daten.
- Atomare Datenänderungen mit PostgreSQL-Transaktion und globaler Revisionsprüfung.
  Bei Konflikt werden Änderungen nicht still überschrieben.
- Anhänge bis 20 MB, in 1-MB-Blöcken hochgeladen und in PostgreSQL gespeichert.
  Download und Vorschau prüfen die Sitzung und Dateifreigabe.
- Vor jeder Änderung wird ein serverseitiger Datenstand für Wiederherstellung gespeichert.
  Das braucht eine betriebliche Aufbewahrungsstrategie; die Erstimplementierung löscht
  Sicherungen und abgebrochene Uploads nicht automatisch.
- Private Daten werden nicht offline gecacht. Ohne Verbindung ist keine Bearbeitung möglich.
- Sicherungsexport enthält Daten und Dateiverweise, nicht die Binärdateien. Für vollständige
  Disaster-Recovery PostgreSQL-Backup einschließlich ion_files und ion_backups verwenden.
- Alte localStorage-Backups werden nicht automatisch hochgeladen. Importiert werden nur
  validierte V2-Sicherungen mit bereits vorhandenen Benutzer-IDs. Für vorhandene lokale
  Firmendaten: BACKUP_PATH sicher setzen und node scripts/migrate-local.cjs in einer leeren
  eingerichteten Datenbank ausführen. Anhänge werden übernommen; andere Konten zunächst
  deaktiviert, bis der Admin neue Passwörter vergibt. Ungültige Altdaten führen zu einem
  vollständigen Rollback statt stillen Korrekturen.

## Fachliche Regeln

- Monatssoll weiterhin standardmäßig 176 h, individuell auch 0 h möglich.
- Tagesgutschrift für Urlaub/Krankheit standardmäßig 8 h, einstellbar; bereits gebuchte
  Arbeitsstunden werden nicht doppelt gutgeschrieben. Feiertagskalender Hessen plus
  zusätzliche firmenweite freie Tage. Diese Regeln vor Echtabrechnung bestätigen.
- Überstunden gesamt = abgeschlossene Salden; laufender Monat separat ausgewiesen.
- Nur vergangene Monate abschließbar. Korrekturen erfordern Wiederöffnung.
- Urlaub wird nach Kalenderjahr und eindeutigen Arbeitstagen gerechnet.
- Einsätze bei bekannter Abwesenheit werden im Formular blockiert; spätere Abwesenheiten
  zeigen bestehende Einsätze als Konflikte. Mehr als acht geplante Stunden brauchen
  eine ausdrückliche Bestätigung; mehr als 24 sind unzulässig.

## Noch offene Abnahme

Siehe `IMPLEMENTATION_STATUS.md`. Insbesondere echte Anmeldung, Dateiupload,
Datenbanksperren unter gleichzeitigen Anfragen, Backups und visuelle Tests auf
Desktop/iOS/Android sind noch nicht in der echten Umgebung verifiziert.
