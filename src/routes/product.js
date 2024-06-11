const express = require('express');
const ProductController = require('../controllers/product');

const productRouter = express.Router();

productRouter.get('/', ProductController.getAll);
productRouter.get('/latest', ProductController.getLatest);
productRouter.post('/', ProductController.create);

module.exports = productRouter;