const movieController = require("express").Router();
const Movie = require("../model/movie");
const authentication = require("../middleware/auth");

movieController.get("/get", authentication, async (req, res) => {
  try {
    const data = await Movie.find({ createdBy: req.abd });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

movieController.get("/get/:id", authentication, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Movie.findById({ _id: id });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

movieController.post("/create", authentication, async (req, res) => {
  try {
    // const data = await Movie.create({ ...req.body, created: req.val });
    const data = await Movie.create({ ...req.body, createdBy: req.abd });
    res.status(201).json({ data, success: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

movieController.put("/update/:id", authentication, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Movie.findByIdAndUpdate({ _id: id }, { ...req.body });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});
movieController.delete("/remove/:id", authentication, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Movie.findByIdAndDelete({ _id: id });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

movieController.get("/watchList", authentication, async (req, res) => {
  try {
    const data = await Movie.find({ createdBy: req.abd, watched: true });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = movieController;
