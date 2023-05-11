const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("<h1 style='color: blue; font-size: 3rem'>Homepage</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1 style='color: green; font-size: 3rem'>About Page</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1 style='color: orange; font-size: 3rem'>Contact Page</h1>");
});

app.all("*", (req, res) => {
    res.status(404);
    res.send("<h1 style='color: red; font-size: 3rem'>The page your requesting does not exist!</h1>");
});

app.listen(5000, () => {
    console.log("Server online, listening on port 5000");
});