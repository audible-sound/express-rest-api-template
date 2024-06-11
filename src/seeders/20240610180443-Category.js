'use strict';
let categories = require("../data/categories");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    categories = categories.map((category) => {
      category.updatedAt = new Date();
      category.createdAt = new Date();
      return category;
    })
    await queryInterface.bulkInsert('Categories', categories, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }};
