const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient.model');
const Dish = require('../models/dish.model');

// Get the ingredients collection
router.get('/', async (req, res, next) => {
    
        const amount = parseInt(req.query.amount);
        const page = parseInt(req.query.page);
        const expression = new RegExp(req.query.ingredient, 'g');
        let total_sum = 0;

            try {
                const ingredients = await Ingredient.find({})
                if(!ingredients || ingredients.length === 0) {
                    return next(err)
                }
                total_sum = ingredients.length;
            } catch(err) {
                res.sendStatus(400);
                return next('Empty collection');
            }

            if (amount === undefined) { amount = total_sum }
        
            try {
                const ingredients = await Ingredient.find({ $or: [ { name: expression }, { category: expression } ] }).skip(page * amount).limit(amount);
                if (!ingredients || ingredients.length === 0) {
                    return next(err);
                }
                res.status(200).send({ data: ingredients, total_sum: total_sum });
            } catch(err) {
                res.sendStatus(404);
                return next('Not found!');
            }
})

// Creates a new ingredient
router.post('/', async (req, res, next) => {
  
    const { name, pPK, loss, finalPrice, category } = req.body;

    const ingredient = new Ingredient({
        name,
        pPK,
        loss,
        finalPrice,
        category
    });

    try {
      const newIngredient = await ingredient.save();
      res.status(201).send(newIngredient);
    } catch(err) {
        res.sendStatus(500);
        return next('Problems saving ingredient');
    }
})

// Update ingredient
router.put('/:id', async (req, res, next) => {  
   const { name, finalPrice } = req.body;
   console.log(req.body)

    try {
        editedIngredient = await Ingredient.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    } catch(err) {
        res.sendStatus(404);
        return next(`There is no ingredient with the id: ${req.params.id}`);
    }
    
    try {
        // Query to calculate the array of ingredients on dishes which need to change
        const matchingDishes = await Dish.aggregate([
            {
                $match: { 'ingredients.name': name}
            },
            {
                $unwind: '$ingredients'
            },
            {
                $match: { 'ingredients.name': name }
            },
            {
                $project: { 'ingredients._id': 1, 'ingredients.name': 1, 'ingredients.gPP': 1,
                'ingredients.pPP': { $divide: [ { $multiply: [ '$ingredients.gPP', finalPrice ] }, 1000] }, 
                }
            }
        ])
        let i = 0;
    
        
        // Loop the array and update the ingredients with the same id
        for (let ing of matchingDishes) {
            try {
            await Dish.updateOne({ 'ingredients._id': matchingDishes[i].ingredients._id },
            {$set: { 'ingredients.$.pPP': matchingDishes[i].ingredients.pPP }});
            i++
            } catch(err) {
                res.sendStatus(500);
                return next('Problems recalculating your dishes!');
            }
        }

        const recalcCost = await Dish.aggregate([
            {
                $match: { 'ingredients.name': name}
            },
            {
                    $project: {
                      total: { $sum: "$ingredients.pPP" }
                    }
            },
          ])

          n = 0
          // Recalculate total just for the dishes which changed their ingredients pPP
          for (let total of recalcCost) {
            try {
            await Dish.updateOne({ 'ingredients._id': matchingDishes[n].ingredients._id},
            {  total: recalcCost[n].total  });
            } catch(err) {
                res.sendStatus(500);
                return next('Problems recalculating your dishes!');
            }
            n++
        }
    
        res.status(200).send(editedIngredient);

    } catch(err) {
        return next('Problems recalculating your dishes!')
    }
    
})

// Delete ingredient
router.delete('/:id', async (req, res, next) => {
    try {
        const toDelete = await Ingredient.findByIdAndDelete(req.params.id);
        res.status(200).send(toDelete);
    } catch(err) {
        res.sendStatus(404);
        return next(`There is no ingredient with the id: ${req.params.id}`);
    }

})

router.get('/pdf', async (req, res, next) => {
    try {
    const ingredients = await Ingredient.find({}, { name: true, category: true, pPK: true, loss: true, finalPrice: true, _id: false });
    res.status(200).send(ingredients);
    } catch(err) {
        res.sendStatus(403);
        return next('Problems getting ingredients collection');
    }
})


module.exports = router; 