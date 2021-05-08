const express = require("express");
const cors = require("cors");
const watherFun = require('./weather');
const moviesFun = require('./movies');

const app = express();
app.use(cors());

require("dotenv").config();
let PORT = process.env.PORT;

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get('/movies', moviesFun );
app.get("/weather", watherFun);

app.listen(PORT);
