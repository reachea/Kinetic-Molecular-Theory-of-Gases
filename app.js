const express = require('express');

// app
const app = express();
const port = proces.env.PORT || 5000;

// middlewares
app.use(express.static('./frontend'));




// listening on port
app.listen(port, () => {
  console.log("listening on port:5000 🚀");
});