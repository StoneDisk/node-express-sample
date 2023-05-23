const express = require('express');
const router = express.Router();

const people_controller = require('../controllers/people-controller');

// this get route provides all people names in the people array
router.get("/", people_controller.getPeople);

// this post route handles data provided through an html form and 
// submitted using client side javascript
router.post("/", people_controller.addPeople);

// this put route updates data based on user provided id and request body 
// then replies with the updated data in json format
router.put("/:id", people_controller.updatePeople);

// this delete route removes data based on user provided id
// then replies with the updated data in json format
router.delete("/:id", people_controller.removePeople);

module.exports = router;