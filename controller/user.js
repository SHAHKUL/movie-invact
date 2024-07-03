require("dotenv").config();
const userController = require("express").Router();

const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

userController.get("/register", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

userController.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({ message: "Already user exist enter another email id" });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hashsync = bcryptjs.hashSync(req.body.password, salt);
      await User.create({ ...req.body, password: hashsync });
      res
        .status(201)
        .json({ message: "User Registered Successfully", register: true });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const compare = bcryptjs.compareSync(password, user.password);

      if (compare) {
        const { name, email, _id } = user._doc;
        var token = jwt.sign(
          { id: user._id, name: user.name },
          process.env.key,
          {
            expiresIn: "24hr",
          }
        );

        res.json({ token, login: true, name, email, _id });
      } else {
        res.json({ message: "* Password is not matched" });
      }
    } else {
      res.json({ message: "* There is no registered data" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = userController;
