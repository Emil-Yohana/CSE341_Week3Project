const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerFile));

module.exports = routes;