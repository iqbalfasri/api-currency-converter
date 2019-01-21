const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const convertCurrency = require("./currency-converter");

const app = express();
const PORT = 9000;

// Handle Cors
app.use(cors());

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route
app.get("/", (req, res) => {
  res.send("Convert mata uang mana saja disini yaaa... :)");
});

app.post("/", (req, res) => {
  let { from_currency, to_currency, amount } = req.body;
  convertCurrency(from_currency, to_currency, amount)
    .then(data => {
      res.json({
        converted: data
      });
    })
    .catch(err => {
      res.json({
        message: err.message
      });
    });
});

app.listen(PORT, () => {
  console.log("Server running");
});
