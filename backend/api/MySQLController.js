const express = require("express");
const router = express.Router();
const { savePuzzle } = require("./MySQLService");

/*
Mu Ye Liu - June 2025

Represents the MySQLController for handling MySQL database operations
*/

router.post("/save", async (req, res) => {
    const { pname, ptype, pjson } = req.body;

    if (!pname || !ptype || !pjson) {
        return res.status(400).send("Missing required fields: pname, ptype, or pjson");
    }

    try {
        await savePuzzle(pname, ptype, JSON.parse(pjson));
        res.status(200).send("Puzzle saved successfully");
    } catch (error) {
        console.error("Error saving puzzle:", error);
        res.status(500).send("Error saving puzzle");
    }

});

module.exports = router;