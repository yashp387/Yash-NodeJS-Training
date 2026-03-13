const express = require("express");
const app = express();

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const ms = Date.now() - start;
    const time = new Date().toISOString();
    console.log(
      `[${time}] ${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`,
    );
  });
  next();
};

app.use(express.json());
app.use(requestLogger);
const PORT = 3000;

let authors = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
let books = [
  { id: 1, title: "Clean Code", authorId: 1 },
  { id: 2, title: "Refactoring", authorId: 1 },
  { id: 3, title: "SICP", authorId: 2 },
];

app.get("/api/authors", (req, res) => {
  res.json({ data: authors });
});

app.get("/api/authors/:id", (req, res) => {
  const authorId = Number(req.params.id);
  // console.log(authorId);
  const author = authors.find((a) => a.id === authorId);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  // console.log(author);
  res.json({ data: author });
});

app.get("/api/authors/:id/books", (req, res) => {
  const authorId = Number(req.params.id);

  const author = authors.find((a) => a.id === authorId);
  if (!author) {
    return res.status(404).json({ error: "Author not found " });
  }

  const book = books.filter((b) => b.authorId === authorId);

  //   console.log(book);
  res.json({ data: book });
});

app.post("/api/authors/:id/books", (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body;

  const author = authors.find((a) => a.id === id);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  if (!title) {
    return res.status(400).json({ error: "Title is missing " });
  }

  const book = {
    id: books.length + 1,
    title,
    authorId: id,
  };

  books.push(book);

  res.status(201).json({ data: book });
});

app.get("/api/books", (req, res) => {
  res.json({ data: books });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
