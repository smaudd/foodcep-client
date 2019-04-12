const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../../config.js');
const UIDGenerator = require('uid-generator');
const uid = new UIDGenerator(256);

const Revoked = require('../models/revoked.model')
const User = require('../models/user.model');
const Session = require('../models/session.model');
const Restaurant = require('../models/restaurant.model');
const auth = require('../auth.js');

router.post('/auth', async (req, res, next) => {

    const { password, email } = req.body;
   
    try {
    // Authenticate User
        let role = await auth.authenticate(email, password);
        // Create TOKEN payloading just with user email
        const token = jwt.sign({ role: role }, config.JWT_SECRET, {
            expiresIn: '1d'
        });
        
        res.cookie('TOKEN', token, {
            withCredentials: true,
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            // secure: true
        });

        let session = await uid.generate();
        res.cookie('SESSION_ID', session, {
            maxAge: 24 * 60 * 60 * 1000,
        });

        const newSession = new Session({
            email,
            session
        });

        await newSession.save();

        userLogged = await User.findOne({ email: email }, { password: false });
        
        res.cookie('ROLE', userLogged.role, {
            maxAge: 24 * 60 * 60 * 1000
        });

        res.cookie('USER', userLogged.name, {
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).send(userLogged);
    } catch(err) {
        res.sendStatus(422);
        return next('Invalid credentials');
    }
});

router.post('/logout', async (req, res, next) => {

    try {
        if (req.body.malicious) {
        
            const toRevoke = await Session.findOneAndDelete({ session: req.cookies.SESSION_ID });
            if (toRevoke !== null) {
                const newRevoked = new Revoked({
                    session: toRevoke.session,
                    email: toRevoke.email
                })
            const revoked = await newRevoked.save();
            console.log('This shit is malicious!');
            }
        }
        res.cookie('TOKEN', 'empty');
        res.status(200).send({ message: 'Cleared session' });
    } catch(err) {
        console.log(err);
        res.sendStatus(403);
        return next('Session not found');
    }
})

router.get('/restaurant', async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findOne({});
        res.status(200).send(restaurant);
    } catch(err) {
        res.sendStatus(500);
        return next('Problems getting your restaurant');
    }
});

module.exports = router;