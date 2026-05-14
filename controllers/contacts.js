const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllData = (req, res) => {
    mongodb.getDb().db('CSE341').collection('contacts').find().toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getData = (req, res) => {
    const contactId = new ObjectId(req.params.id);
    mongodb.getDb().db('CSE341').collection('contacts').find({ _id: contactId }).toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createData = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favouriteColor: req.body.favouriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db('CSE341').collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

const updateData = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favouriteColor: req.body.favouriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db('CSE341').collection('contacts').replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
}; 

const deleteData = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('CSE341').collection('contacts').remove({ _id: contactId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
};

module.exports = { getAllData, getData, createData, updateData, deleteData };