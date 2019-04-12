const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const config = require('../../config');
// const User = require('./models/user.model');

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Get user by email
            const user = await User.findOne({ email });

            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {

                if (err) {
                    throw err;
                }

                if (isMatch) {
                    resolve(user.role);
                } else {
                    // Pass didn't match
                    reject('Authentication Failed!');
                }
            });
        } catch(err) {
            // Email not found
            reject('Authentication Failed!');
        }
    });
}

// Checks if it is a role with permissions for this route
exports.permission = () => {
    return (req, res, next) => {
        const token = jwt.verify(req.cookies.TOKEN, config.JWT_SECRET, async (err, decoded) => {
            if (decoded) {
                if (decoded.role !== 'chef') {
                    res.status(403).send(true);
                    return next('No permissions to be here')
                }
            } else {
                return next('No token available')
            }
        next();
        });
    }
}

exports.validateEmail = (email) => {
    return new Promise (async (resolve, reject) => {
        try {
            const searchEmail = await User.findOne({ email });
            // Email already registred, input email is invalid
            if (searchEmail !== null) {
                reject('Email already registred');
            }
            next();
        } catch(err) {
            resolve('Valid email');
        }
    })
}