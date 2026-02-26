const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse query params (Vercel style)
app.use((req, res, next) => {
    req.query = req.query || {};
    next();
});

// Serve static files (index.html, etc)
app.use(express.static(__dirname));

// Route API calls to files in /api
app.get('/api/:endpoint', (req, res) => {
    const endpoint = req.params.endpoint;
    try {
        const handler = require(path.join(__dirname, 'api', `${endpoint}.js`));
        // Mocking Vercel's req/res for the specific handler
        handler(req, res);
    } catch (e) {
        console.error(e);
        res.status(500).send('API Error: ' + e.message);
    }
});

app.listen(port, () => {
    console.log(`SINTEL-HP Local Server running at http://localhost:${port}`);
});
