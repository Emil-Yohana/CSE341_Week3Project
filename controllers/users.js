const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllData = (req, res) => {
    mongodb.getDb().db('CSE341').collection('users').find().toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getData = (req, res) => {
    const userId = new ObjectId(req.params.id);
    mongodb.getDb().db('CSE341').collection('users').find({ _id: userId }).toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createData = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        address: req.body.address,
        city: req.body.city,
        postCode: req.body.postCode
    };
    const response = await mongodb.getDb().db('CSE341').collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const updateData = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        address: req.body.address,
        city: req.body.city,
        postCode: req.body.postCode
    };
    const response = await mongodb.getDb().db('CSE341').collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
}; 

const deleteData = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('CSE341').collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

module.exports = { getAllData, getData, createData, updateData, deleteData };