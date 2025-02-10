//* ================================================
//* ============== Articles Endpoints ==============
//* ================================================

const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// Create New Article
router.post("/articles", async (req, res) => {
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
router.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

// Get Specific Article By ID
router.get("/articles/:articleId", async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);
    res.json(article);
  } catch (error) {
    res.send("something went wrong", error.message);
  }
});

// Update Specific Article By ID
router.put("/articles/:articleId", async (req, res) => {
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
router.delete("/articles/:articleId", async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.articleId);
    res.json({ message: "Article deleted successfully", article });
  } catch (error) {
    res.send("something went wrong", error.message);
  }
});

// Return Articles in HTML File
router.get("/showArticles", async (req, res) => {
  const articles = await Article.find();
  res.render("articles.ejs", {
    articles: articles,
  });
});

// Export the router
module.exports = router;
