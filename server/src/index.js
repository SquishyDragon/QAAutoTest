const express = require("express");
const app = express();
const port = 3000;

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
