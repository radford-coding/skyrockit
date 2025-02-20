const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// GET /users/:userId/applications
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('applications/index.ejs', {
            applications: currentUser.applications,
        });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

// GET /users/:userId/applications/new
router.get('/new', (req, res) => {
    res.render('applications/new.ejs');
});

// POST /users/:userId/applications
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

module.exports = router;