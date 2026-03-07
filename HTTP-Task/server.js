const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const PORT = 3000;
const db_file = path.join(__dirname, "users.json");

async function readData() {
  const data = await fs.readFile(db_file, "utf-8");
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile(db_file, JSON.stringify(data, null, 2));
}

async function getRequestBody(req) {
  let body = "";
  for await (const data of req) {
    body += data;
  }
//   console.log("Body:", body);
  if (!body) return {};

  try {
    return JSON.parse(body);
  } catch {
    throw new Error("Invalid JSON body");
  }
}

function sendResponse(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const parseUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parseUrl.pathname;
  const method = req.method;

  const parts = pathname.split("/");
  const userId = Number(parts[2]);

  try {
    if (method === "GET" && pathname === "/users") {
      const users = await readData();
      return sendResponse(res, 200, users);
    }

    if (method === "GET" && pathname.startsWith("/users/")) {
      const users = await readData();
      const result = users.find((u) => u.id === userId);

      if (!result) {
        return sendResponse(res, 404, { message: "User not found" });
      }

      return sendResponse(res, 200, result);
    }

    if (method === "POST" && pathname === "/users") {
      const body = await getRequestBody(req);
      const users = await readData();

      const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        ...body,
      };

      users.push(newUser);
      await writeData(users);

      return sendResponse(res, 201, {
        message: "User created successfully",
        user: newUser,
      });
    }

    if (method === "PUT" && pathname.startsWith("/users/")) {
      const users = await readData();
      const body = await getRequestBody(req);

      const updateUsers = users.map((u) =>
        u.id === userId ? { ...u, ...body } : u,
      );

      const user = updateUsers.find((u) => u.id === userId);

      if (!user) {
        return sendResponse(res, 404, { message: "user not found" });
      }

      await writeData(updateUsers);

      return sendResponse(res, 200, {
        message: "user updated",
        user,
      });
    }

    if (method === "DELETE" && pathname.startsWith("/users/")) {
      const users = await readData();

      const remainingUsers = users.filter((u) => u.id !== userId);

      if (users.length === remainingUsers.length) {
        return sendResponse(res, 404, { message: "user not found" });
      }

      await writeData(remainingUsers);

      return sendResponse(res, 200, {
        message: "user deleted",
      });
    }

    sendResponse(res, 404, { message: "Invalid route" });
  } catch (err) {
    sendResponse(res, 500, { error: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
