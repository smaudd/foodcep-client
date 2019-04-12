const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pPK: {
        type: Number,
        required: true,
    },
    loss: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }

})

IngredientSchema.plugin(timestamp);
module.exports = mongoose.model('Ingredient', IngredientSchema);