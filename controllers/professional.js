const mongodb = require('../db/connect');

const getData = (req, res) => {
    mongodb.getDb().db('CSE341').collection('Professional').find().toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

module.exports = { getData };