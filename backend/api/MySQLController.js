const express = require("express");
const router = express.Router();
const { savePuzzle, getAllPuzzleInfo } = require("./MySQLService");

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
        await savePuzzle(pname, ptype, pjson);
        res.status(200).json({ message: "Puzzle saved successfully" });
    } catch (error) {
        console.error("Error saving puzzle:", error);
        res.status(500).json({ error: "Failed to save puzzle" });
    }

});

router.get("/getAllPuzzleInfo", async (req, res) => {
    try {
        const puzzles = await getAllPuzzleInfo();
        res.status(200).json(puzzles);
    } catch (error) {
        console.error("Error fetching all puzzle info:", error);
        res.status(500).json({ error: "Failed to fetch all puzzle info" });
    }
});

router.get("/getSpecificPuzzle/:puzzleName", async (req, res) => {
    const puzzleName = req.params.puzzleName;

    if (!puzzleName) {
        return res.status(400).send("Missing required field: puzzleName");
    }

    try {
        const puzzle = await getSpecificPuzzle(puzzleName);
        if (!puzzle) {
            return res.status(404).json({ error: "Puzzle not found" });
        }
        res.status(200).json(puzzle);
    } catch (error) {
        console.error("Error fetching specific puzzle:", error);
        res.status(500).json({ error: "Failed to fetch specific puzzle" });
    }
});

module.exports = router;