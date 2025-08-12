const express = require('express');
const router = express.Router();
const supabaseService = require('../services/supabaseService');

router.get("/", async (req, res) => {
    try {
        const data = await supabaseService.getLibraryBooks();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch library books" });
    }
});

router.post("/add-book", async (req, res) => {
    try {
        const { title, volume_id, coverUrl } = req.body;
        await supabaseService.addBookToLibrary(volume_id, title, coverUrl);
        res.status(201).json({ message: "Book added" });
    } catch (err) {
        if (err.message === "Book already exists in library") {
            return res.status(409).json({ error: err.message });
        }
        console.log(err);
        res.status(500).json({ error: "Failed to add book to library" });
    }
});

router.delete("/delete-book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await supabaseService.deleteBookFromLibrary(id);
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete book from library" });
    }
});

module.exports = router;
