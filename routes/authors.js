const express = require('express');
const router = express.Router();


const authorsController = require('../controllers/authors');
const validation = require('../middleware/validate');

//get all contacts documents
router.get('/', authorsController.getAll);

//get single contact document by id
router.get('/:id', authorsController.getSingle);

//Create a POST route to create a new contact.
router.post('/', validation.saveAuthor, authorsController.createAuthor);

//Create a PUT route to update a contact
router.put('/:id', validation.saveAuthor, authorsController.updateAuthor);

//Create a DELETE route to delete a contact
router.delete('/:id', validation.saveAuthor, authorsController.deleteAuthor);

//export the router
module.exports = router;