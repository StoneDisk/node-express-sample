const express = require('express');
const router = express.Router();

// this post route handles data submitted through an html form
// with the default browser submission process
router.post("/", (req, res) => {
    const {name} = req.body;

    if (name) {
        return res.status(200).send(`Welcome ${name}`);
    }

    res.status(401).send("Please provide a valid credential.");
});

module.exports = router;