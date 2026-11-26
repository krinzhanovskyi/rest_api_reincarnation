const express = require("express");
const app = express();

// JSON-Daten aus eingehenden Anfragen lesen
app.use(express.json());

const port = 3000;
const Datenbank = require("./database.js");
const db = new Datenbank("./messages.db");

// Alle Nachrichten abrufen
app.get("/api/messages", (req, res) => {
  res.json({ messages: db.nachrichtenAbrufen() });
});

// Eine einzelne Nachricht abrufen
app.get("/api/messages/:id", (req, res) => {
  res.json(db.nachrichtAbrufen(Number(req.params.id)));
});

// Eine neue Nachricht erstellen
app.post("/api/messages", (req, res) => {
  const { name, message } = req.body;
  res.status(201).json(db.nachrichtErstellen(name, message));
});

// Eine Nachricht redaktieren
app.patch("/api/messages/:id", (req, res) => {
  const { message } = req.body;
  const id = Number(req.params.id);
  res.json(db.nachrichtRedaktieren(message, id));
});

// Öffentliche Dateien aus dem Ordner public bereitstellen
app.use(express.static(__dirname + "/public"));

// Webserver starten
app.listen(port, () => {
  console.log(`Webserver läuft und hört auf Port ${port}`);
});
