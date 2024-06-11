const express = require('express');
const CategoryController = require('../controllers/category');

const categoryRouter = express.Router();

categoryRouter.get('/', CategoryController.getAll);
categoryRouter.post('/', CategoryController.create);

module.exports = categoryRouter;