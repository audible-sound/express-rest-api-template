const { Category, sequelize } = require('../models/index');

class CategoryController {
    static async getAll(req, res, next) {
        try {
            const categories = await Category.findAll();
            res.status(200).json({
                message: "Success",
                data: categories
            });
        } catch (err) {
            next(err);
        }
    }
    static async create(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { name } = req.body;
            const createdCategory = await Category.create({
                name
            }, {
                transaction: transaction
            });
            await transaction.commit();
            res.status(201).json({
                message: "Category created",
                data: createdCategory
            });
        } catch (err) {
            if (err.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(err);
        }
    }
}

module.exports = CategoryController;