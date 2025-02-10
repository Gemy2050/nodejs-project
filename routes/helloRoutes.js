const express = require("express");
const router = express.Router();

// Define routes
router.get("/hello", (req, res) => {
  res.send("Hello World");
});

router.post("/hi", (req, res) => {
  res.send("Hi There");
});

router.get("/sayHello", (req, res) => {
  res.json({
    name: req.query.name,
    age: req.query.age,
    country: "Egypt",
  });
});

router.get("/findSum/:number1/:number2", (req, res) => {
  const { number1, number2 } = req.params;
  const sum = parseInt(number1) + parseInt(number2);
  res.send(`The sum of ${number1} and ${number2} is equal ${sum}`);
});

router.get("/findSumFromBody", (req, res) => {
  if (!req.body.number1 || !req.body.number2) {
    res.send(`No numbers provided in body`);
    return;
  }
  const { number1, number2 } = req.body;
  res.send(`the sum = ${number1 + number2}`);
});

router.get("/html", (req, res) => {
  res.send("<h1>Hello There</h1>");
});

router.get("/file", (req, res) => {
  res.sendFile(__dirname + "/views/hello.html");
});

router.get("/dynamicFile", (req, res) => {
  const name = "Mohamed Gamal";
  res.render("profile.ejs", {
    name: name,
    age: 20,
  });
});

module.exports = router;
