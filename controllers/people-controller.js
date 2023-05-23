const {people} = require('../data_sources/data');

const getPeople = (req, res) => {
    res.status(200).json({success: true, data: people});
}

const addPeople = (req, res) => {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({success: false, msg: "please provide name value"});
    }
    res.status(201).json({success: true, person: name});
}

const updatePeople = (req, res) => {
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
}

const removePeople = (req, res) => {
    const {id} = req.params;

    const person = people.find((person) => person.id === Number(id));

    if (!person) {
        return res
        .status(404)
        .json({success: false, msg: `no person with ${id}`});
    }

    const modifiedPeople = people.filter((person) => person.id !== Number(id));

    return res.status(200).json({ success: true, data: modifiedPeople });
}

module.exports = {
    getPeople,
    addPeople,
    updatePeople,
    removePeople
};