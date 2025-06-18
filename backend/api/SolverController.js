const express = require("express");
const router = express.Router();
const { callSolver } = require("./SolverService");

router.post("/solve", async (req, res) => {
  try {
    const payload = req.body;
    const result = await callSolver(payload);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;