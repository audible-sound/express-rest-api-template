'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Cart.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'user_id cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'user_id cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};