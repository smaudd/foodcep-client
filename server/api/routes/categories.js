const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');

router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find({});
        if (!categories || categories.length === 0){
            next(err);
        }
        res.status(200).send(categories);
    } catch(err) {
        res.sendStatus(400);
        return next('Empty collection!');
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;

    const category = new Category ({
        name
    });

    try {
        const newCategory = await category.save()
        res.status(201).send(newCategory);
    } catch(err) {
        res.sendStatus(500);
        return next('Cannot save this category');
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const toEdit = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).send(toEdit);
    } catch(err) {
        res.sendStatus(404);
        return next(`There is no category with the id: ${req.params.id}`);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const toDelete = await Category.findByIdAndDelete(req.params.id);
        res.status(200).send(toDelete);
    } catch(err) {
        res.sendStatus(404);
        return next(`There is no category with the id: ${req.params.id}`);

    }
})

module.exports = router;