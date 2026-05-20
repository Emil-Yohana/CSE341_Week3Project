const routes = require('express').Router();

const productsController = require('../controllers/products');

routes.get('/', productsController.getAllData);

routes.get('/:id', productsController.getData);

routes.post('/', productsController.createData);

routes.put('/:id', productsController.updateData);

routes.delete('/:id', productsController.deleteData);

module.exports = routes;