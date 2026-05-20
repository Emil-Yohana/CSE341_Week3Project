const routes = require('express').Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');

routes.get('/', usersController.getAllData);

routes.get('/:id', usersController.getData);

routes.post('/', validation.saveUser, usersController.createData);

routes.put('/:id', validation.saveUser, usersController.updateData);

routes.delete('/:id', usersController.deleteData);

module.exports = routes;