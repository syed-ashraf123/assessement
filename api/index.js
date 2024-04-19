const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/";
const smartphones = require("./model");
const cors = require("cors");
app.use(cors());

app.get("/smartphone", async (req, res) => {
  const data = await smartphones.findOne();
  return res.send(data);
});

app.listen(port, async () => {
  await mongoose.connect("mongodb://127.0.0.1/sample");

  console.log(`Example app listening on port ${port}`);
});
