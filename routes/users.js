const routes = require('express').Router();

const usersController = require('../controllers/users');

routes.get('/', usersController.getAllData);

routes.get('/:id', usersController.getData);

routes.post('/', usersController.createData);

routes.put('/:id', usersController.updateData);

routes.delete('/:id', usersController.deleteData);

module.exports = routes;