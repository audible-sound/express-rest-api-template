'use strict';
const { HashPassword } = require('../helpers/encryption.js')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Address, { foreignKey: 'user_id' });
      User.hasOne(models.Cart, { foreignKey: 'user_id' });
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'First name cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'First name cannot be empty'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Last name cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Last name cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING(100),
      unique: {
        args: true,
        msg: 'Email already registered'
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email is not valid'
        },
        notNull: {
          args: true,
          msg: 'Email cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        len: {
          args: 8,
          msg: 'Password must be at least 8 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password =  HashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};