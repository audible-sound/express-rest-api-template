'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Address.init({
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
    },
    address_line1:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'address_line1 cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'address_line1 cannot be empty'
        }
      }
    },
    address_line2: DataTypes.STRING,
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'city cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'city cannot be empty'
        }
      }
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'postal_code cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'postal_code cannot be empty'
        }
      }
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'country cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'country cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};