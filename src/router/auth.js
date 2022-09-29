require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

require("../db/conn");
const User = require("../models/userSchema");

const port = 5000;

router.get("/", (req, res) => {
  res.send(`Hello from nodeJs server auth.js: ${port}`);
});

//>>>>>>>>>>>>>>>>. Using Promises <<<<<<<<<<<<<<<<<<<<<
// router.post("/register",  (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     res.status(422).json({ error: "Please fill all fields properly" });
//   }

//   User.findOne({ email: email })

//     .then((userExist) => {
//       if (userExist) {
//         res.status(422).json({ error: "Email already exist" });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "User resistered successfully.." });
//         })
//         .catch((err) =>
//           res.status(500).json({ error: "Error while resistering user" })
//         );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//>>>>>>>>>>>>>>>>>>  USING Async-Await <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    res.status(422).json({ error: "🙄 Please fill all fields properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(422).json({ error: "🙄 Email already exist" });
    } else if (password != cpassword) {
      res.status(422).json({ error: "🙄 Password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      //hashing password and cpassword from userSchema.js

      await user.save();

      res.status(201).json({ message: "User resistered successfully..😍" });
    }
  } catch (err) {
    console.log(`😫 Failed to register user ---- ${err}`);
  }
});

// >>>>>>>>>>>>>>>> Login Route <<<<<<<<<<<<<<<<<<<<<<<<
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "🙄 Please fill all fields properly" });
    }

    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);


      if (!isMatch) {
        res.status(400).json({ error: "😪 User not found" });
      } else {
        res.json({ message: "😍User login successfully😍" });
      }
    } else {
      res.status(400).json({ error: "😪 User not found" });
    }
  } catch (err) {
    console.log(`😫 Failed to login user ---- ${err}`);
  }
});

module.exports = router;
