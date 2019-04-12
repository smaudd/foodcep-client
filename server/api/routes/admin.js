const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Session = require('../models/session.model');
const Restaurant = require('../models/restaurant.model');
const auth = require('../auth');
const bcrypt = require('bcryptjs');


router.get('/profile/:id', async (req, res, next) => {

    let id = req.params.id;

    try {
        user = await User.findOne({ _id: id }, { password: false });
        res.status(200).send(user);
    } catch(err) {
        res.sendStatus(404);
        return next(err);
    }

})

router.get('/profiles', async (req, res, next) => {

    try {
        const users = await User.find({}, { name: true, email: true, role: true});
        res.status(200).send(users);
    } catch(err) {
        res.status(500);
        return next('Problem getting your users list!')
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
                const user = await User.findOneAndUpdate({ email: email }, { password: newPassword }, { projection: { password: false }, new: true });
                res.status(200).send(user);
            } catch(err) {
                res.sendStatus(500);
                return next(err);
            }
        });
    });
});

router.put('/changeEmail', async (req, res, next) => {

   
    const { email, newEmail } = req.body;
    console.log(email);
    try {
        const validEmail = await auth.validateEmail(newEmail);
    } catch(err) {
        res.sendStatus(409);
        return next('Email repeated');
    }

    try {
        const user = await User.findOneAndUpdate({ email: email }, { email: newEmail }, { projection: { password: false }, new: true });
        const session = await Session.findOneAndUpdate({ email: email }, { email: newEmail }, { projection: { email: true }, new: true } );
        res.status(200).send(user);
    } catch(err) {
        res.sendStatus(404);
        return next('User not found!');
    }
})

router.put('/changeRole', async (req, res, next) => {

    const { email, role } = req.body;

    try {
        const user = await User.findOneAndUpdate({ email: email }, { role: role }, { projection: { password: false }, new: true })
        res.status(200).send(user)
    } catch(err) {
        res.sendStatus(404);
        return next('User not found!');
    }
    
})

router.post('/deleteUser', async (req, res, next) => {

    let { email } = req.body;

    try {
        let toDelete = await User.findOneAndDelete({ email: email }, { projection: { password: false, updatedAt: false, createdAt: false, __v: false } });
        res.status(200).send(toDelete);
    } catch(err) {
        res.snedStatus(404);
        return next('User not found!');
    }
})

router.post('/createUser', async (req, res, next) => {

    const { email, password, name, role } = req.body;
    console.log(req.body);
    const user = new User({
        email,
        password,
        name,
        role
    });
    console.log(user);
    // Encrypting password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async (err, hash) => {
            // Hash password 
            user.password = hash;
            // Save User
            try {
                const validEmail = await auth.validateEmail(email);
            } catch(err) {
                res.sendStatus(409);
                return next('Email repeated!');
            }

            try {
                const newUser = await user.save();
                res.status(201).send({ user: newUser._id });
            } catch(err) {
                res.sendStatus(500);
                return next({ msg: 'Problem creating the new user'});
            }
        });
    })
});

router.post('/restaurant/:id', async (req, res, next) => {
    const { name, cusine, adress, phone, description } = req.body;
        // Updating the restaurant if we recieve some id to search on the collection
    if (req.params.id !== 'none') {
            try {
                const update = await Restaurant.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
                res.status(200).send(update);
            } catch(err) {
                res.sendStatus(500);
                return next('Problems updating your restaurant');
            }
    } else {
        // Creating the restaurant if we don't have any id to search for
        const restaurant = new Restaurant({
            name, 
            cusine,
            adress,
            phone,
            description,
        });
            try {
                const save = await restaurant.save();
                res.status(201).send(save);
            } catch(err) {
                res.sendStatus(500);
                return next('Problems registering your restaurant');
            }
        }

})


module.exports = router;

