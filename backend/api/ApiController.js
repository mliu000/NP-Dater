const express = require("express");
const router = express.Router();
const { callSolver } = require("../services/solverService");

router.post("/solve", async (req, res) => {
  try {
    const result = await callSolver("solve", req.body.input);
    res.json({ result });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;