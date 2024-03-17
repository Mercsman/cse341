const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db('project1').collection('authors').find();
    result.toArray((err, lists) => {
        if (err) {
            res.status(400),json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a author.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project1').collection('authors').find({ _id: userId});
    result.toArray((err, lists) => {
        if (err) {
            res.status(400),json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createAuthor = async (req, res) => {
    const author = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        genre: req.body.genre,
    };
    const response = await mongodb.getDatabase().db('project1').collection('authors').insertOne(author);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the author.');
    }
};

const updateAuthor = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a author.');
    }
    const userId = new ObjectId(req.params.id);
    const author = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        genre: req.body.genre,
    };
    const response = await mongodb.getDatabase().db('project1').collection('authors').replaceOne({ _id: userId}, author);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the author.');
    }
};

const deleteAuthor = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a author.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project1').collection('authors').deleteOne({ _id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the author.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createAuthor,
    updateAuthor,
    deleteAuthor
};