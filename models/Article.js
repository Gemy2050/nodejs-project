const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: String,
    numberOfLikes: Number,
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.numberOfLikes;
        return ret;
      },
    },
  }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
