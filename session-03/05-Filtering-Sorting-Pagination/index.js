const express = require("express");
const app = express();

let products = [
  { id: 1, name: "Laptop", category: "tech", price: 999 },
  { id: 2, name: "Phone", category: "tech", price: 499 },
  { id: 3, name: "Desk", category: "furniture", price: 299 },
  { id: 4, name: "Chair", category: "furniture", price: 199 },
];

app.get("/api/products", (req, res) => {
  const { category, sort, page = 1, limit = 10 } = req.query;
  let result = [...products];

  if (category)
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );

  if (sort) {
    const isDescending = sort.startsWith("-");
    const data = isDescending ? sort.substring(1) : sort;

    result.sort((a, b) => {
      if (isDescending) {
        return b[data] - a[data];
      } else {
        return a[data] - b[data];
      }
    });
  }

  const total = result.length;

  const start = (page - 1) * limit;
  const end = start + Number(limit);

  result.slice(start, end);

  res.json({
    data: result,
    total,
    page: Number(page),
    limit: Number(limit),
  });
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
