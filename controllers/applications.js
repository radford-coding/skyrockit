const express = require('express');
const router = express.Router();

const User = require('../models/user');

// GET /users/:userId/applications
router.get('/', (req, res) => {
    try {
        res.render('applications/index.ejs');
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

module.exports = router;