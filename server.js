const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config(); // Lädt die Umgebungsvariablen aus der .env-Datei
const app = express();
const port = process.env.PORT || 3000;
// Überprüfen, ob der DEEPSEEK_API_KEY gesetzt ist
if (!process.env.DEEPSEEK_API_KEY) {
    console.error('Fehler: DEEPSEEK_API_KEY ist nicht in der .env-Datei gesetzt.');
    process.exit(1); // Beendet den Prozess mit einem Fehlercode
}
// API-Schlüssel aus der .env-Datei laden
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/summarize'; // Beispiel-URL

// Statische Dateien (HTML, CSS, JS) bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Route für die Startseite
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Middleware, um JSON-Requests zu verarbeiten
app.use(express.json());

// Endpoint für Textzusammenfassung
app.post('/summarize', async (req, res) => {
    const text = req.body.text; // Text aus dem Request-Body

    if (!text) {
        return res.status(400).json({ error: 'Text ist erforderlich.' });
    }

    try {
        // Anfrage an die DeepSeek API senden
        const response = await axios.post(DEEPSEEK_API_URL, {
            text: text // Der Text, der zusammengefasst werden soll
        }, {
            headers: {
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Annahme: Die API gibt ein Objekt mit einer 'summary' Eigenschaft zurück
        const summary = response.data.summary;
        res.json({ summary: summary });
    } catch (error) {
        console.error('Fehler bei der Zusammenfassung des Textes:', error);
        res.status(500).json({ error: 'Fehler bei der Zusammenfassung des Textes.' });
    }
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});