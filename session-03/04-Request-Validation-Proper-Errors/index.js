const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;

let users = [];

function validateUser(body) {
  const errors = [];

  if (!body.name) {
    errors.push({ message: "Name is required", code: 400 });
  }

  if (!body.email) {
    errors.push({ message: "Email is required", code: 400 });
  }

  if (body.name && body.name.trim() === "") {
    errors.push({ message: "Name cannot be blank", code: 422 });
  }

  if (body.email && !body.email.includes("@")) {
    errors.push({ message: "Email is invalid", code: 422 });
  }
  return errors;
}

app.post("/api/users", (req, res) => {
  const errors = validateUser(req.body);
  if (errors.length > 0) {
    const err = errors[0];
    return res.status(err.code).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
  }

  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).json({ data: user });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
