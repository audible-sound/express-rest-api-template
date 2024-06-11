const { Product, sequelize } = require('../models/index');

class ProductController {
    static async create(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            let { name, description, price, stock, category_id, imgUrl } = req.body;
            price = parseFloat(price);
            const createdProduct = await Product.create({
                name,
                price,
                stock,
                category_id,
                imgUrl,
                description
            }, {
                transaction: transaction
            });
            await transaction.commit();
            res.status(201).json({
                message: "Product created",
                data: createdProduct
            });

        } catch (err) {
            if (err.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(err);
        }
    }
    static async getAll(req, res, next) {
        try {
            const products = await Product.findAll();
            res.status(200).json({
                message: "Success",
                data: products
            });
        } catch (err) {
            next(err);
        }
    }
    static async getLatest(req, res, next) {
        try {
            const products = await Product.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 5
            });
            res.status(200).json({
                message: "Success",
                data: products
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ProductController;