const routes = require('express').Router();
const productsController = require('../controllers/products');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', productsController.getAllData);

routes.get('/:id', productsController.getData);

routes.post('/', isAuthenticated, validation.saveProduct, productsController.createData);

routes.put('/:id', isAuthenticated, validation.saveProduct, productsController.updateData);

routes.delete('/:id', isAuthenticated, productsController.deleteData);

module.exports = routes;