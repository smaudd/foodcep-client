const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Session = require('../models/session.model');
const auth = require('../auth');
const bcrypt = require('bcryptjs');

router.get('/profile', async (req, res, next) => {

    
    let session = req.cookies.SESSION_ID;
    console.log(session);
    try {
        session = await Session.findOne({ session: session });
        user = await User.findOne({ email: session.email }, { password: false });
        console.log(user);
        res.status(200).send(user);
    } catch(err) {
        res.status(404);
        return next(err);
    }

})

router.post('/checkCurrentPassword', async(req, res, next) => {
    console.log(req.body);
    let { email, currentPassword } = req.body;
    try {
    let password = await auth.authenticate(email, currentPassword);
    res.status(200).send(true);
    } catch(err) {
        const invalidPassword = {
            password: false
        }
        console.log(invalidPassword);
        res.status(422).send(invalidPassword)
    }
})

router.put('/changePassword', async (req, res, next) => {
    let { email, newPassword } = req.body;
  
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, async (err, hash) => {
            // Hash password 
            newPassword = hash;
            // Save New Password
            try {
                const user = await User.findOneAndUpdate({ email: email }, { password: newPassword });
                res.status(200).send(user);
            } catch(err) {
                res.sendStatus(500);
                return next(err);
            }
        });
    });
});

router.put('/changeName', async (req, res, next) => {

    let { email, name } = req.body;

    try {
        const user = await User.findOneAndUpdate({ email: email }, { name: name }, { projection: { password: false }, new: true });
        if (user === null) {
            return next('Email not found');
        }
        res.cookie('USER', name, {
            maxAge: 86400 * 1000 * 7,
        });
        res.status(200).send(user);
    } catch(err) {
        res.sendStatus(500);
        return next(err);
    }
});

router.put('/changeEmail', async (req, res, next) => {

    const { email, password, newEmail } = req.body;

    try {
        const user = await auth.authenticate(email, password);
    } catch(err) {
        res.sendStatus(422);
        return next('Wrong password');
    }

    try {
        const validEmail = await auth.validateEmail(newEmail);
    } catch(err) {
        res.status(409).send(email);
        return next('Email repeated');
    }

    try {
        const user = await User.findOneAndUpdate({ email: email }, { email: newEmail }, { projection: { password: false }, new: true });
        // Changing email to the new value on the session document
        const session = await Session.findOneAndUpdate({ session: req.cookies.SESSION_ID }, { email: newEmail }, { projection: { email: true }, new: true } );
        res.status(200).send(user);
    } catch(err) {
        res.sendStatus(403);
        return next('User not found');
    }
})

router.put('/changeRole', async (req, res, next) => {

    const { email, role } = req.body;

    try {
        const user = await User.findOneAndUpdate({ email: email }, { role: role }, { projection: { password: false }, new: true })
        res.status(200).send(user);
    } catch(err) {
        res.sendStatus(406);
        return next('User not found');
    }
    
})

router.post('/deleteAccount', async (req, res, next) => {

    let { email, currentPassword } = req.body;

    try {
        let user = await auth.authenticate(email, currentPassword);
    } catch(err) {
        res.status(422);
        return next(err);
    }

    try {
        let user = await User.findOneAndDelete({ email: email });
        res.status(200).send(user)
    } catch(err) {
        res.sendStatus(403);
        return next('User not found!');
    }
})

router.post('/language', async (req, res, next) => {
    const { id, language } = req.body;
    try {
        const user = await User.findByIdAndUpdate({ _id: id }, { language: language }, { projection: { password: false }, new: true });
        res.status(200).send(user);
    } catch(err) {
        res.sendStatus(404);
        return next('User not found');
    }
})

module.exports = router;

