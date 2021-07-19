const express = require('express');

// app
const app = express();

// middlewares
app.use(express.static('./frontend'));




// listening on port
const port = proces.env.PORT || 5000

app.listen(port, () => {
  console.log("listening on port:5000 🚀");
});