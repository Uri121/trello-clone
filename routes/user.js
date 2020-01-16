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
    let { name, email, phone, password, role } = req.body;
    let userMail = await User.findOne({ email: email });
    console.log("user email found:",userMail);
    if (userMail) {
      res
        .status(500)
        .send({ msg: "A user with that email is already exist." });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      role: role || "basic"
    });

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
    console.log(email);
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(500).send({msg:"User does not exist"});
    }
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) {
      return res.status(500).send({msg:"Wrong password"});
    }


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
router.get("/auth",auth,(req,res)=>{
  User.findById(req.user.id).select('-password').then(user=>res.json(user));
})

module.exports = router;
