const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  createdBy: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  year: {
    type: String,
  },
  genre: {
    type: String,
  },
  review: {
    type: String,
  },
  rating: {
    type: String,
  },
  img: {
    type: String,
  },
  watched: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const movieModel = mongoose.model("movies", Schema);
module.exports = movieModel;
