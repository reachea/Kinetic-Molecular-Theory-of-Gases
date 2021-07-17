const express = require('express');

// app
const app = express();

// middlewares
app.use(express.static('./frontend'));




// listening on port
app.listen(5000, () => {
  console.log("listening on port:5000 🚀");
});