const express = require('express');
const userRouter = require('./user.js');
const categoryRouter = require('./category.js');
const productRouter = require('./product.js');

const router = express.Router();

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);

module.exports = router;