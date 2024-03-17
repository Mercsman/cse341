const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
    const result = await mongodb.getDatabase().db('books').collection('books').find();
    result.toArray((err, lists) => {
        if (err) {
            res.status(400),json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingleBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a book.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('books').collection('books').find({ _id: userId});
    result.toArray((err, lists) => {
        if (err) {
            res.status(400),json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createBook = async (req, res) => {
    const book = {
        title: req.body.title,
        authorFirstName: req.body.authorFirstName,
        authorLastName: req.body.authorLastName,
        genre: req.body.genre,
        publisher: req.body.publisher,
        series: req.body.series,
        yearPublished: req.body.yearPublished
    };
    const response = await mongodb.getDatabase().db('books').collection('books').insertOne(book);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the book.');
    }
};

const updateBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a book.');
    }
    const userId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        authorFirstName: req.body.authorFirstName,
        authorLastName: req.body.authorLastName,
        genre: req.body.genre,
        publisher: req.body.publisher,
        series: req.body.series,
        yearPublished: req.body.yearPublished
    };
    const response = await mongodb.getDatabase().db('books').collection('books').replaceOne({ _id: userId}, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
};

const deleteBook = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a book.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('books').collection('book').deleteOne({ _id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the book.');
    }
};

module.exports = {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
};