const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        favoriteColor: 'required|string',
        birthday: 'string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};
const saveBook = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        authorFirstName: 'required|string',
        authorLastName: 'required|string',
        genre: 'required|genre',
        publisher: 'string',
        series: 'string',
        yearPublished: 'string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveAuthor = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        genre: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined){
        return res.status(401).json("You do not have access.");
    }
    next();
};

module.exports = { saveContact, saveAuthor, saveBook, isAuthenticated };