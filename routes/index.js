const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');


routes.get('/', lesson1Controller.emilyRoute);
routes.get('/john', lesson1Controller.johnRoute);

module.exports = routes;