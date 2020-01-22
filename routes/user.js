const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
dotenv.config();

//User Model
const User = require("../model/User");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

//add user
router.post("/create", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let userMail = await User.findOne({ email: email });
    if (userMail) {
      res.status(500).send({ msg: "A user with that email is already exist." });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword
    });

    console.log( process.env.JWT_SECRET);
    
    user.save().then(user => {
      jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) console.log(err);
          res.json({ token, user });
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(500).send({ msg: "User does not exist" });
    }
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) {
      return res.status(500).send({ msg: "Wrong password" });
    }
    console.log( process.env.JWT_SECRET);

    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) console.log(err);
        res.json({ token, user });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//get user from token using jwt
router.get("/auth", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
