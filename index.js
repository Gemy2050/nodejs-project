const express = require("express");
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
require("dotenv").config();

// Import routes
const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    //* Listen to port 3000
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection Error", err);
  });

const app = express();
app.use(express.json());

// Add CORS middleware
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Serve Swagger UI static files
app.use(
  "/api-docs",
  express.static(path.join(__dirname, "node_modules/swagger-ui-express/static"))
);

const swaggerDocument = YAML.load(path.join(__dirname, "./swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use routes
app.use("/", articleRoutes); // Routes for /articles, /articles/:articleId, etc.
app.use("/", userRoutes);

//* ================================================
