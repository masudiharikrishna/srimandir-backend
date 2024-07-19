const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const { initializeTables } = require('./models/models');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// Initialize database tables
initializeTables();

// Use API routes
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Srimandir API');
});

module.exports = app;
