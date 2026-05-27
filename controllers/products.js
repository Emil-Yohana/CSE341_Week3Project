const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllData = async (req, res) => {
    try {
        const lists = await mongodb.getDb().db('CSE341').collection('products').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getData = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid product id to find a product.');
    }
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db('CSE341').collection('products').find({ _id: userId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const createData = async (req, res) => {
    try {
        const product = {
            productId: req.body.productId,
            productName: req.body.productName,
            category: req.body.category,
            brand: req.body.brand,
            price: req.body.price,
            currency: req.body.currency,
            stock: req.body.stock,
            sku: req.body.sku,
            rating: req.body.rating
        };
        const response = await mongodb.getDb().db('CSE341').collection('products').insertOne(product);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the product.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const updateData = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid product id to update a product.');
    }
    try {
        const userId = new ObjectId(req.params.id);
        const product = {
            productId: req.body.productId,
            productName: req.body.productName,
            category: req.body.category,
            brand: req.body.brand,
            price: req.body.price,
            currency: req.body.currency,
            stock: req.body.stock,
            sku: req.body.sku,
            rating: req.body.rating
        };
        const response = await mongodb.getDb().db('CSE341').collection('products').replaceOne({ _id: userId }, product);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the product.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
}; 

const deleteData = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid product id to delete a product.');
    }
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db('CSE341').collection('products').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the product.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = { getAllData, getData, createData, updateData, deleteData };