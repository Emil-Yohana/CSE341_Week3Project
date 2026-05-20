const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users & Products API',
        description: 'API for managing users and products in CSE341'
    },
    host: 'cse341-week3project.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);