const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

app.get('/api/questions', async (req, res) => {
    try {
        const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching quiz data');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});