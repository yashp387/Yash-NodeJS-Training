const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Express!");
});

app.get("/about", (req, res) => {
  res.json({ name: "My API", version: "1.0" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
