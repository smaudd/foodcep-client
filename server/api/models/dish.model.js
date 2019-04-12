const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');


const IngredientsSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        gPP: {
            type: Number,
            required: true
        },
        pPP: {
            type: Number,
            required: true
        }
});

const DishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: [IngredientsSchema],
    total: {
        type: Number,
        required: true
    }
});


DishSchema.plugin(timestamp);
module.exports = mongoose.model('Dish', DishSchema);