const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Article = require("./models/Article");

mongoose
  .connect(
    "mongodb+srv://gemy:123@firstnodejscluster.u3cgh.mongodb.net/?retryWrites=true&w=majority&appName=FirstNodeJSCluster"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connection Error", err);
  });

const app = express();
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.post("/hi", (req, res) => {
  res.send("Hi There");
});

app.get("/sayHello", (req, res) => {
  // Return JSON
  res.json({
    name: req.query.name,
    age: req.query.age,
    country: "Egypt",
  });
});

app.get("/findSum/:number1/:number2", (req, res) => {
  const { number1, number2 } = req.params;
  const sum = parseInt(number1) + parseInt(number2);
  res.send(`The sum of ${number1} and ${number2} is equal ${sum}`);
});

app.get("/findSumFromBody", (req, res) => {
  if (!req.body.number1 || !req.body.number2) {
    res.send(`No numbers provided in body`);
    return;
  }
  const { number1, number2 } = req.body;
  res.send(`the sum = ${number1 + number2}`);
});

// Send Html in Response
app.get("/html", (req, res) => {
  res.send("<h1>Hello There</h1>");
});

// Send Html File in Response
app.get("/file", (req, res) => {
  res.sendFile(__dirname + "/views/hello.html");
});

// Send Html File with dynamic values (js) in Response
app.get("/dynamicFile", (req, res) => {
  const name = "Mohamed Gamal";
  res.render("profile.ejs", {
    name: name,
    age: 20,
  });
});

//* ================================================
//* ============== Articles Endpoints ==============
//* ================================================

// Create New Article
app.post("/articles", async (req, res) => {
  const { title, body } = req.body;
  const newArticle = new Article({
    title,
    body,
    numberOfLikes: 0,
  });
  await newArticle.save();

  res.status(201).json(newArticle);
});

// Get All Articles
app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

// Get Specific Article By ID
app.get("/articles/:articleId", async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);
    res.json(article);
  } catch (error) {
    res.send("something went wrong", error.message);
  }
});

// Update Specific Article By ID
app.put("/articles/:articleId", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.articleId,
      req.body,
      { new: true }
    );
    res.json(article);
  } catch (error) {
    res.send("something went wrong", error.message);
  }
});

// Delete Specific Article By ID
app.delete("/articles/:articleId", async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.articleId);
    res.json({ message: "Article deleted successfully", article });
  } catch (error) {
    res.send("something went wrong", error.message);
  }
});

// Return Articles in HTML File
app.get("/showArticles", async (req, res) => {
  const articles = await Article.find();
  res.render("articles.ejs", {
    articles: articles,
  });
});

//* ================================================

//* Listen to port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
