'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, { foreignKey: 'category_id' });
    }
  }
  Category.init({
    name: {
      type:DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Category name cannot be null'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};