const routes = require('express').Router();

const contactsController = require('../controllers/contacts');

routes.get('/', contactsController.getAllData);

routes.get('/:id', contactsController.getData);

routes.post('/', contactsController.createData);

routes.put('/:id', contactsController.updateData);

routes.delete('/:id', contactsController.deleteData);

module.exports = routes;