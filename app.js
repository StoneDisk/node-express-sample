const express = require('express');
const app = express();

const {products} = require('./data_sources/data');

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

// This route is for handling bad requests
app.all("*", (req, res) => {
    res.status(404);
    res.send("<h1 style='color: red; font-size: 3rem'>The page your requesting does not exist!</h1>");
});

app.listen(5000, () => {
    console.log("Server online, listening on port 5000");
});