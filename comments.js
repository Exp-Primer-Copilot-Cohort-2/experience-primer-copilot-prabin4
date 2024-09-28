// Create web server
const express = require('express');
const app = express();

// Create a route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});