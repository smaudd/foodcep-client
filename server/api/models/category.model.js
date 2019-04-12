const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

CategorySchema.plugin(timestamp);
module.exports = mongoose.model('Category', CategorySchema);