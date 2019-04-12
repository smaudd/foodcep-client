const express = require('express');
const api = express.Router();

const ingredients = require('./routes/ingredients.js');
const categories = require('./routes/categories.js');
const dishes = require('./routes/dishes.js');
const suppliers = require('./routes/suppliers.js');
const profile = require('./routes/profile.js');
const admin = require('./routes/admin.js');
const auth = require('./auth');
const orders = require('./routes/orders.js')

api.use((req, res, next) => {

    api.use('/ingredients/', auth.permission(req.cookies.TOKEN), ingredients);
    api.use('/categories', auth.permission(req.cookies.TOKEN), categories);
    api.use('/dishes', auth.permission(req.cookies.TOKEN), dishes);
    api.use('/user/', profile);
    api.use('/admin/', auth.permission(req.cookies.TOKEN), admin);
    api.use('/suppliers/', auth.permission(req.cookies.TOKEN), suppliers)
    api.use('/orders/', orders);

    next();
})



module.exports = api;