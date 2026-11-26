const express = require("express");
const app = express();
const port = 3000;
const Datenbank = require("./database.js");
const db = new Datenbank("./messages.db");

app.get("/api/messages", (req, res) => {
  const nachrichten = db.nachrichtenAbrufen();
  res.json({ messages: nachrichten });
});

// Öffentliche Dateien aus dem Ordner public bereitstellen
app.use(express.static(__dirname + "/public"));

// Webserver starten
app.listen(port, () => {
  console.log(`Webserver läuft und hört auf Port ${port}`);
});
