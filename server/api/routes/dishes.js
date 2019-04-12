const express = require('express');
const router = express.Router();
const Dish = require('../models/dish.model');


router.post('/', async (req, res) => {

  
    const { name, category, ingredients, total } = req.body;

    const dish = new Dish({
        name,
        category,
        ingredients: [],
        total
    })

    // Pushing all the ingredients from the request to the created Dish Model
    ingredients.forEach((ingredient) => {
        dish.ingredients.push(ingredient);  
    })
    
    try {
    const newDish = await dish.save();
      res.status(201).send(newDish);

    } catch(err) {
        res.sendStatus(500);
        res.send('Error! Failed while creating the dish!')
 
    }
});

router.get('/', async (req, res, next) => {
    const reply = {
        msg: 'Empty collection!'
    }
    try {
        const dishes = await Dish.find({});
        if (!dishes || dishes.length === 0) {
            next(err);
        }
        res.status(200).send(dishes);
    } catch(err) {
        res.sendStatus(204);
        return next('Empty collection!');
    }
})


router.put('/:id', async (req, res, next) => {
    try {
        const toEdit = await Dish.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).send(toEdit);
    } catch(err) {
        res.sendStatus(404);
        return next(`There is no dish with the id: ${req.params.id}`);
    }
});

router.delete('/:id', async (req, res, next) => {

    try {
        const toDelete = await Dish.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send(toDelete);
    } catch(err) {
        res.sendStatus(404);
        return next(`There is no dish with de id: ${req.params.id} to delete!`);
    }
})

router.get('/pdf/:id', async (req, res, next) => {

    try {
        const dish = await Dish.findOne({ _id: req.params.id });
        res.status(200).send(dish);
    } catch(err) {
        res.sendStatus(404);
        return next('Dish not found')
    }
})

module.exports = router