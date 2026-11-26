const express = require("express");
const app = express();

// JSON-Daten aus eingehenden Anfragen lesen
app.use(express.json());

const port = 3000;
const Datenbank = require("./database.js");
const db = new Datenbank("./messages.db");

app.get("/api/messages", (req, res) => {
  const nachrichten = db.nachrichtenAbrufen();
  res.json({ messages: nachrichten });
});

// Eine einzelne Nachricht abrufen
app.get("/api/messages/:id", (req, res) => {
  const id = Number(req.params.id);
  const nachricht = db.nachrichtAbrufen(id);

  if (!nachricht) {
    return res.status(404).json({
      fehler: "Nachricht nicht gefunden",
    });
  }

  res.json(nachricht);
});

// Eine neue Nachricht erstellen
app.post("/api/messages", (req, res) => {
  const { name, message } = req.body ?? {};

  if (
    typeof name !== "string" ||
    typeof message !== "string" ||
    name.trim() === "" ||
    message.trim() === ""
  ) {
    return res.status(400).json({
      fehler: "Name und Nachricht müssen ausgefüllt sein",
    });
  }

  const nachricht = db.nachrichtErstellen(name.trim(), message.trim());

  res.status(201).json(nachricht);
});

// Öffentliche Dateien aus dem Ordner public bereitstellen
app.use(express.static(__dirname + "/public"));

// Webserver starten
app.listen(port, () => {
  console.log(`Webserver läuft und hört auf Port ${port}`);
});
