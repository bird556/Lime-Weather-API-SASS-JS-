const express = require('express'); // "require" the Express module
const app = express(); // obtain the "app" object
const axios = require('axios');
let colors = require('colors');
const path = require('path');
require('dotenv').config();

const HTTP_PORT = process.env.PORT || 8080; // assign a port
const API_KEY = process.env.KEY;

// Configure CORS to allow requests from your Netlify domain
app.use(
  cors({
    origin: 'https://limeweather.netlify.app',
  })
);

// Static Middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
  const city = req.query.city || 'Toronto'; // Default to Toronto if no city is provided
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// start the server on the port and output a confirmation to the console
app.listen(HTTP_PORT, () =>
  console.log(
    `Server Listening On:`.green,
    `http://localhost:${HTTP_PORT}`.blue,
    '\n'
  )
);
