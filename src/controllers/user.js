const {User, Address, Cart, sequelize} = require('../models/index.js');
const {CreateToken} = require('../helpers/jsonwebtoken.js')
const {ComparePassword} = require('../helpers/encryption.js');

class UserController {
    static async register(req, res, next) {
        const transaction = await sequelize.transaction();
        try {
            const { email, password, first_name, last_name, address_line1, address_line2, city, postal_code, country } = req.body;
            const createdUser = await User.create({
                email,
                password,
                first_name,
                last_name
            },
            {
                transaction: transaction
            });
            const createdAddress = await Address.create({
                user_id: createdUser.id,
                address_line1,
                address_line2,
                city,
                postal_code,
                country
            },
            {
                transaction: transaction
            });
            const createdCart = await Cart.create({
                user_id: createdUser.id
            },
            {
                transaction: transaction
            });
            await transaction.commit();
            const payload = {
                id: createdUser.id,
                email: createdUser.email,
            };
            const token = CreateToken(payload);
            res.status(201).json({
                message: "Registration successful",
                access_token: token,
                data: {
                    id: createdUser.id,
                    first_name: createdUser.first_name,
                    email: createdUser.email,
                    Cart: createdCart
                }
            });
        } catch (err) {
            if (err.name.includes('Sequelize')) {
                await transaction.rollback();
            }
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const searchUser = await User.findOne({
                where: {
                    email
                },
                include: [Cart]
            });
            if (!searchUser) {
                throw ({name: "INVALID_EMAIL"});
            }
            const foundUser = searchUser.dataValues;
            if (!ComparePassword(password, foundUser.password)) {
                throw ({name: "INVALID_PASSWORD"});
            }
            const token = CreateToken(foundUser);
            res.status(200).json({
                message: "Authentication successful",
                access_token: "token"
            });
        } catch (err) {
           next(err);
        }
    }
}

module.exports = UserController;