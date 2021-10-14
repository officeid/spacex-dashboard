const {planets} = require('../../models/planets.model');

function getAllPlanets(req, res) {
    console.log("[INFO] Request recieved by getAllPlanets.");
    return res.status(200).json(planets);
}

module.exports = {
    getAllPlanets
}