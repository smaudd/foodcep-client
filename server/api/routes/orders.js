const express = require('express');
const router = express.Router();
const Order = require('../models/orders.model');

router.get('/', async (req, res, next) => {
  try {
    // Query for supplier, date of creation and count of items on the order content. Sorted by date. First is newest date. It doesnt include the whole list of items
    const orders = await Order.aggregate([
        { $project: { supplier: 1, date: 1, madeBy: 1, total_items: { $size: "$order" } } },
        { $sort: { date: -1 }}
    ])
    res.status(200).send(orders);
  } catch(err) {
    res.status(400)
    return next('Empty collection!')
  }

})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).send(order)
  } catch(err) {
    res.sendStatus(404)
    return next(`There's no order with the id ${req.params.id}`)
  }
})

router.post('/', async (req, res, next) => {
  const { supplier, order, madeBy } = req.body;
    const newOrder = new Order({
      supplier,
      order: [],
      madeBy
    })
  // Pushing all the items from the request to the created Order Model
  order.forEach((item) => {
      newOrder.order.push(item);
  })

  try {
    const createOrder = await newOrder.save();
    res.status(200).send(createOrder)
  } catch(err) {
    res.sendStatus(400)
    return next('Problems saving your order');
  }

})

module.exports = router;
