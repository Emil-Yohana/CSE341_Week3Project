const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const professionalRoutes = require('./routes/professional');
const contactsRoutes = require('./routes/contacts');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');

app.use(cors());
app.use('/professional', professionalRoutes);
app.use('/contacts', contactsRoutes);
app.use(bodyParser.json());

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(process.env.port || port);
        console.log('Connected to MongoDB and Web Server is listening at ' + (process.env.port || port));
    }
});