import express from "express";
import config from "./config/index.mjs";

const app = express();
app.use(express.json());

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method}-${req.url}`);
  next();
}

// app.use(loggingMiddleware);

const MockUsers = [
  { id: 1, displayname: "John", username: "jonathan", },
  { id: 2, displayname: "Kevin", username: "kevin", },
  { id: 3, displayname: "Shehan", username: "shehan", },
  { id: 4, displayname: "anson", username: "Anson", },
  { id: 5, displayname: "jack", username: "Jack", },
  { id: 6, displayname: "adam", username: "Adam", },
  { id: 7, displayname: "tina", username: "Tina", },
];
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

// app.get("/", loggingMiddleware, (req, res) => {
//   // res.send("Hello World!");
//   res.status(200).json({ msg: "Hello World!" });
// });

app.get("/", 
// (req, res, next) => {
//   console.log("Base URL 1")
//   next();
// },
//   (req, res, next) => {
//     console.log("Base URL 2")
//     next();
//   },
//   (req, res, next) => {
//     console.log("Base URL 3")
//     next();
//   },
  (req, res) => {
    // res.send("Hello World!");
    res.status(200).json({ msg: "Hello World!" });
  });


app.get("/api/users", (req, res) => {
  console.log(req.query);

  const { filter, value } = req.query;

  // When filter and value are undefined
  // if (!filter && !value) {
  //   res.send(MockUsers);
  // }

  if (filter && value) {
    const filteredUsers = MockUsers.filter((user) =>
      user[filter].toLowerCase().includes(value.toLowerCase())
    );
    res.send(filteredUsers);
  }
  return res.send(MockUsers);
});


app.use(loggingMiddleware);

// app.get("/api/users/:id", (req, res) => {
//   console.log(req.params);
//   const parseId = parseInt(req.params.id);
//   // console.table(parseId);
//   if (isNaN(parseId)) return res.status(400).send({ msg: 'Bad Request Invalid ID' });
//   const findUser = MockUsers.find((user) => { user.id === parseId });
//   if (!findUser) return res.sendStatus(404);
//   return res.send(findUser); 
// });

//chatgpt
//GET POST PUT PATCH DELETE
// PUT and PATCH are used to update the data in the database
// put and patch not same//
// patch is used update partial data in records
// but put update entire records

app.post('/api/users', (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = { id: MockUsers[MockUsers.length - 1].id + 1, ...body };
  MockUsers.push(newUser);
  return res.status(201).send(newUser);
});

app.get("/api/users/:id", (req, res) => {
  console.log(req.params);
  const parseId = parseInt(req.params.id);
  if (isNaN(parseId)) return res.status(400).send({ msg: 'Bad Request Invalid ID' });
  const findUser = MockUsers.find((user) => user.id === parseId); // Add the missing return statement here
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});


app.get("/api/products", (req, res) => {
  res.send([
    { id: 1, name: "Product 1", price: 2000, },
    { id: 2, name: "Product 2", price: 2020, },
    { id: 3, name: "Product 3", price: 2020, },
  ]);
});

app.post("/api/products", (req, res) => { });

// app.put("/api/users/:id", (req, res) => {
//   const { body, params: { id } } = req;
//   const parseId = parseInt(id);
//   if (isNaN(parseId)) return res.statusCode(404);
//   const findUserIndex = MockUsers.findIndex(
//     (user) => user.id === parseId);
//   if (findUserIndex === -1) res.statusCode(404);
//   MockUsers[findUserIndex] = { id: parseId, ...body };
//   return res.statusCode(204);
// });


app.put("/api/users/:id", (req, res) => {
  const { body, params: { id } } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) {
    return res.sendStatus(404);
  }
  const findUserIndex = MockUsers.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return res.sendStatus(404);
  MockUsers[findUserIndex] = { id: parseId, ...body };
  return res.sendStatus(200);
});

app.patch("/api/users/:id", (req, res) => {
  const { body, params: { id } } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) {
    return res.sendStatus(404);
  }
  const findUserIndex = MockUsers.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return res.sendStatus(404);
  MockUsers[findUserIndex] = { ...MockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

app.delete("/api/users/:id", (req, res) => {
  const { params: { id } } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);
  const findUserIndex = MockUsers.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return res.sendStatus(404);
  MockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});