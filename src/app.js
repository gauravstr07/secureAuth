require("dotenv").config();
const express = require("express");
require("./db/conn");
const app = express();
const dotenv = require('dotenv');
app.use(express.json());

dotenv.config({path: '../config.env'})

// const user = require('./models/userSchema');

app.use(require("./router/auth"));


const port = 5000;

// Middleware
const middleware = (req, res, next) => {
  console.log(`Hello my middleware`);
  next();
};

app.get("/home", (req, res) => {
  res.send(`Home Page - ${port}`);
});

app.get("/about", middleware, (req, res) => {
  console.log("Hello my about");
  res.send(`About Page - ${port}`);
});

app.get("/contact", (req, res) => {
  res.send(`Contact Page - ${port}`);
});

app.get("/signin", (req, res) => {
  res.send(`SignIn Page - ${port}`);
});

app.get("/signup", (req, res) => {
  res.send(`SignUp Page - ${port}`);
});

app.listen(port, () => {
  console.log(`Your backend server running on port: ${port}`);
});
