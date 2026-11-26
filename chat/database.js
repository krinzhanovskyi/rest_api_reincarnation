module.exports = function (datei) {
  const Database = require("better-sqlite3");

  this.db = new Database(datei);

  // Tabelle erstellen, falls sie noch nicht existiert
  this.db.exec(`
    CREATE TABLE IF NOT EXISTS message (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL
    );
  `);

  // Beispieldaten nur einfügen, wenn die Tabelle leer ist
  const abfrage = this.db.prepare("SELECT COUNT(*) AS anzahl FROM message");
  const ergebnis = abfrage.get();

  if (ergebnis.anzahl === 0) {
    const einfuegen = this.db.prepare(
      "INSERT INTO message (name, message) VALUES (?, ?)",
    );

    einfuegen.run("Admin", "Hallo Node.js!");
    einfuegen.run("Pablo", "Guten Tag!");
    einfuegen.run("Paolo", "Willkommen im Chat!");
  }

  // Alle Nachrichten aus der Datenbank abrufen
  this.nachrichtenAbrufen = function () {
    return this.db.prepare("SELECT * FROM message").all();
  };

  // Datenbankverbindung schliessen
  this.schliessen = function () {
    this.db.close();
  };
};
