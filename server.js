const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const swaggerRoutes = require('./routes/swagger');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');

app.use(cors());
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/', swaggerRoutes);

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception Origin: ${origin}`);
});

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(process.env.port || port);
        console.log('Connected to MongoDB and Web Server is listening at ' + (process.env.port || port));
    }
});