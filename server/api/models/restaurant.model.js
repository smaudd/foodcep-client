const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cusine: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

RestaurantSchema.plugin(timestamp);
module.exports = mongoose.model('Restaurant', RestaurantSchema);