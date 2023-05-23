const express = require('express');
const router = express.Router();

const {products} = require('../data_sources/data');


 /*
 The following routes responds with json
  */
 router.get("/", (req, res) => {
    const productsMinInfo = products.map((product) => {
        const {id, name, image} = product;
        return {id, name, image};
    });
    res.json(productsMinInfo);
});

// Route Parameter Example
// this route will give the specific product that 
// matches the user provided productID
router.get("/:productID", (req, res) => {
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
router.get("/v1/productSearch/query", (req, res) => {
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

module.exports = router;
