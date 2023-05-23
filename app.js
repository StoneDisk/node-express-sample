const express = require('express');
const app = express();

const productsRouter = require('./routes/products');
const peopleRouter = require('./routes/people');
const authRouter = require('./routes/auth');

// tells express that the public folder contains static assests
app.use(express.static('./public'));
// tells express to parse form data and access it through the request object
app.use(express.urlencoded({extended: false}));
// tells express to parse incoming json data
app.use(express.json());
/*  the following registers router instances to handle routing for a base path */
app.use("/api/products", productsRouter);
app.use("/api/people", peopleRouter);
app.use("/login", authRouter); 

// This default route does not work because express detects a static index.html file
app.get("/", (req, res) => {
    res.send("<h1 style='color: blue; font-size: 3rem'>Homepage</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1 style='color: green; font-size: 3rem'>About Page</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1 style='color: orange; font-size: 3rem'>Contact Page</h1>");
});

// This route is for handling bad requests (no request matches any of the routes above)
app.all("*", (req, res) => {
    res.status(404);
    res.send("<h1 style='color: red; font-size: 3rem'>The page your requesting does not exist!</h1>");
});

app.listen(5000, () => {
    console.log("Server online, listening on port 5000");
});