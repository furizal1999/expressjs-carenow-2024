const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World Lalaal!");
});

app.post("/post", (req, res) => {
  if (req.body) {
    console.log(req.body);
    res.send(req.body);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
