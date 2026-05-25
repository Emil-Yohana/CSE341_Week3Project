const routes = require('express').Router();
const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', usersController.getAllData);

routes.get('/:id', usersController.getData);

routes.post('/', isAuthenticated, validation.saveUser, usersController.createData);

routes.put('/:id', isAuthenticated, validation.saveUser, usersController.updateData);

routes.delete('/:id', isAuthenticated, usersController.deleteData);

module.exports = routes;