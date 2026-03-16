// Look at this Express code:
// router.get("/users", (req, res) => {
//   const users = JSON.parse(fs.readFileSync("./data/users.json"));
//   res.json(users);
// });

// a) Why is readFileSync considered a bad practice in production servers?
// -> readFileSync is synchronous and blocking in nature. when this functions runs node.js blocks the event loop and the server can't process other requests and all incoming requests wait untill the file read.

// b) Rewrite the route using async/await with fs.promises.
const fs = require('fs').promises;

router.get("/users", async (req, res, next) => {
  try {
    const data = await fs.readFile("./data/users.json", "utf-8");
    const users = JSON.parse(data);
    res.json(users);
  } catch (error) {
    next(error);
  }
});


// c) What will happen to the Node.js event loop if many requests call this route simultaneously?
// when readFileSync runs node.js blocks the event loop and the server can't process other requests and all incoming requests wait untill the file read. so this causes the slow responses and poor scalability.