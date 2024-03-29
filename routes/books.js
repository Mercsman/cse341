const express = require('express');
const router = express.Router();


const booksController = require('../controllers/books');
// const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/validate');

//get all books documents
router.get('/', booksController.getAll);

//get single book document by id
router.get('/:id', booksController.getSingle);

//Create a POST route to create a new book.
router.post('/', isAuthenticated, booksController.createBook);

//Create a PUT route to update a book
router.put('/:id', isAuthenticated, booksController.updateBook);

//Create a DELETE route to delete a book
router.delete('/:id', isAuthenticated, booksController.deleteBook);

//export the router
module.exports = router;