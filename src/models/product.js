'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {foreignKey: 'category_id'});
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING(200),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Product name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Product name cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Description cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Price cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        }
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'category_id cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'category_id cannot be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Stock cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Stock cannot be empty'
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'imgUrl cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'imgUrl cannot be empty'
        },
        isUrl: {
          args: true,
          msg: 'imgUrl must be a valid url'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};