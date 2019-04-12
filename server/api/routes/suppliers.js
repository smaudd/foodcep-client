const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier.model');

router.get('/', async (req, res, next) => {
    try {
        const suppliers = await Supplier.find({}).sort({ name: 1 });
        if(!suppliers || suppliers.length === 0) {
            return next(err)
        }
        res.status(200).send(suppliers);
    } catch(err) {
        res.sendStatus(400);
        return next('Empty collection!');
    }
})


router.post('/', async (req, res, next) => {

    const { name, email, phone, comertial } = req.body;

    try {
        const supplier = new Supplier({
            name,
            email,
            phone,
            comertial
        })
        const createSupplier = await supplier.save();
        res.status(200).send(createSupplier);
    } catch(err) {
        res.sendStatus(500);
        return next('Problems saving supplier')
    }
})

router.put('/:id', async (req, res, next) => {
    
    try {
        const toEdit = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).send(toEdit);
    } catch(err) {
        res.sendStatus(404);
        return next(`There's no supplier with the id ${req.params.id}`)
    }

})

router.delete('/:id', async (req, res, next) => {
    
    try {
        const toDelete = await Supplier.findByIdAndDelete(req.params.id);
        res.status(200).send(toDelete);
    } catch(err) {
        res.sendStatus(404);
        return next(`There's no supplier with the id ${req.params.id}`)
    }
})

module.exports = router;