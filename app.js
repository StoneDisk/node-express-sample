const express = require('express');
const app = express();

const {products, people} = require('./data_sources/data');

// tells express that the public folder contains static assests
app.use(express.static('./public'));
// tells express to parse form data and access it through the request object
app.use(express.urlencoded({extended: false}));
// tells express to parse incoming json data
app.use(express.json());

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

 /*
 The following routes responds with json
  */
app.get("/api/products", (req, res) => {
    const productsMinInfo = products.map((product) => {
        const {id, name, image} = product;
        return {id, name, image};
    });
    res.json(productsMinInfo);
});

// Route Parameter Example
// this route will give the specific product that 
// matches the user provided productID
app.get("/api/products/:productID", (req, res) => {
    const {productID} = req.params;
    const specificProduct = products.find((product) => {
        return product.id === Number(productID);
    });

    // Invalid product request check
    if (!specificProduct) {
        return res.status(404).send(`<h1 style='color: red'>
                                    The product that your looking for
                                    does not exist!
                                    <h1>`);
    }

    res.json(specificProduct);
});

// query string parameters example
// this route will give the product/s that 
// matches the user provided search term and result limit
app.get("/api/v1/productSearch/query", (req, res) => {
    const {search, limit} = req.query;
    let sortedProducts = [...products];

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        });
    }

    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }

    res.status(200).json(sortedProducts);
});

app.get("/api/people", (req, res) => {
    res.status(200).json({success: true, data: people});
});

// this post route handles data provided through an html form and 
// submitted using client side javascript
app.post("/api/people", (req, res) => {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({success: false, msg: "please provide name value"});
    }
    res.status(201).json({success: true, person: name});
});

// this post route handles data submitted through an html form
// with the default browser submission process
app.post("/login", (req, res) => {
    const {name} = req.body;

    if (name) {
        return res.status(200).send(`Welcome ${name}`);
    }

    res.status(401).send("Please provide a valid credential.");
});

// this put route updates data based on user provided id and request body 
// then replies with the updated data in json format
app.put("/api/people/:id", (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    const person = people.find((person) => person.id === Number(id));

    if (!person) {
        return res
        .status(404)
        .json({success: false, msg: `no person with ${id}`});
    }

    const modifiedPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }
        return person;
    });

    res.status(200).json({success: true, data: modifiedPeople});
});

// This route is for handling bad requests (no request matches any of the routes above)
app.all("*", (req, res) => {
    res.status(404);
    res.send("<h1 style='color: red; font-size: 3rem'>The page your requesting does not exist!</h1>");
});

app.listen(5000, () => {
    console.log("Server online, listening on port 5000");
});