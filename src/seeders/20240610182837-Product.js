'use strict';
let products = require("../data/products");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    products = products.map((product) => {
      product.updatedAt = new Date();
      product.createdAt = new Date();
      return product;
    })
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }};
