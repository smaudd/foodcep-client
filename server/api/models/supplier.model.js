const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    comertial: {
        type: String,
        required: true
    }
})

SupplierSchema.plugin(timestamp);
module.exports = mongoose.model('Supplier', SupplierSchema);