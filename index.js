require("dotenv").config();

const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidable());

const transactionsRoutes = require("./routes/transactions");
app.use(transactionsRoutes);

app.get("/", (req, res) => {
  res.json("Welcome on my Memory Test API !");
});

app.get("*", (req, res) => {
  res.json("Oops, looks like this page doesn't exist !");
});

app.listen(process.env.PORT, () => {
  console.log("Server started !");
});
