const routes = require('express').Router();
const productsController = require('../controllers/products');
const validation = require('../middleware/validate');

routes.get('/', productsController.getAllData);

routes.get('/:id', productsController.getData);

routes.post('/', validation.saveProduct, productsController.createData);

routes.put('/:id', validation.saveProduct, productsController.updateData);

routes.delete('/:id', productsController.deleteData);

module.exports = routes;