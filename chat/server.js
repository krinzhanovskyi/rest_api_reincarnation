const express = require("express");
const app = express();
const port = 3000;

// Öffentliche Dateien aus dem Ordner public bereitstellen
app.use(express.static(__dirname + "/public"));

// Webserver starten
app.listen(port, () => {
  console.log(`Webserver läuft und hört auf Port ${port}`);
});
