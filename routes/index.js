const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));
router.use('/authors', require('./authors'));
router.use('/books', require('./books'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// router.get('/', (req, res) => {
//     //#swagger.tags=['Hello World']
//     res.send('Hello World');
// });





module.exports = router;