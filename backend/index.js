const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());               // Allow frontend requests
app.use(express.json());       // Parse JSON request bodies

// Example endpoint
app.post("/solve", (req, res) => {
  const input = req.body.input;
  // TODO: call C++ solver later
  res.json({ result: `Solving for: ${input}` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});