const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllData = async (req, res) => {
    try {
        const lists = await mongodb.getDb().db('CSE341').collection('users').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getData = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid user id to find a user.');
    }
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db('CSE341').collection('users').find({ _id: userId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const createData = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const updateData = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid user id to update a user.');
    }
    try {
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
    } catch (err) {
        res.status(500).json({ message: err });
    }
}; 

const deleteData = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid user id to delete a user.');
    }
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db('CSE341').collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the user.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = { getAllData, getData, createData, updateData, deleteData };