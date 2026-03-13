const express = require("express");
const homeRouter = require("./routes/home");
const apiRouter = require("./routes/api");

const app = express();
const PORT = 3000;

app.use("/api", homeRouter);
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
