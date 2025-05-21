const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

const apiRoute = require("./api/ApiController");

app.use(cors());           
app.use(express.json());       
app.use("/api", apiRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});