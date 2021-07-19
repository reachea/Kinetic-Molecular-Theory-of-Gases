const express = require('express');
const path = require('path');

// app
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.static('./frontend'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './frontend/index.html'));
});

// listening on port
app.listen(port, () => {
  console.log("listening on port:5000 🚀");
});