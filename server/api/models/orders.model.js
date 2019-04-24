const mongoose = require('mongoose');

const OrderContentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
})


const OrderSchema = new mongoose.Schema({
    supplier: {
      type: String,
      required: true
    },
    order: [OrderContentSchema],
    madeBy: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }

})

module.exports = mongoose.model('Order', OrderSchema);
