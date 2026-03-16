// Look at this route handler:
app.get("/user/:id", async (req, res, next) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    throw new Error("User not found");
  }
  res.json(user);
});

// a) If getUserById() throws an error, will Express automatically send it to error middleware? Why or why not?
// -> No express will not automatically catch the error in this case becuase getUserById() throws an error or rejected promise then it becomes an unhandled promise rejection. So the error will not reach to error middleware unless you pass it to next().

// b) Modify the code so the error correctly reaches Express error middleware.
app.get("/user/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// c) What is the correct signature of an Express error middleware?
app.use((err, res, req, next) => {
  res.status(500).json({
    error: err.message,
  });
});