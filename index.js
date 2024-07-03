require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userController = require("./controller/user");
const movieController = require("./controller/movie");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userController);
app.use("/movie", movieController);

mongoose
  .connect(process.env.URL)
  .then(() => {
    app.listen(process.env.Port, () => {
      console.log("server conneted", process.env.Port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({ message: "server running successfully!!!" });
});
