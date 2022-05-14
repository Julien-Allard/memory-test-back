const express = require("express");
const router = express.Router();
const dataset = require("../data/parser");

router.get("/transactions", async (req, res) => {
  try {
    res.status(200).json(dataset.results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
