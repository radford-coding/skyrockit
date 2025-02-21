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

// GET /users/:userId/applications/:applicationId
router.get('/:applicationId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        const application = user.applications.id(req.params.applicationId);
        res.render('applications/show.ejs', { application, user, });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

// DELETE /users/:userId/applications/:applicationId
router.delete('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.id(req.params.applicationId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

// GET /users/:userId/applications/:applicationId/edit
router.get('/:applicationId/edit', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        const application = user.applications.id(req.params.applicationId);
        res.render('applications/edit.ejs', { application, user, });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});

// PUT /users/:userId/applications/:applicationId
router.put('/:applicationId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        console.log(req.body);
        const application = user.applications.id(req.params.applicationId);
        application.set(req.body);
        await user.save();
        res.redirect(`/users/${user._id}/applications/${req.params.applicationId}`);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    };
});



module.exports = router;