'use strict';

// traer los modelos
const { CategorySchema, CATEGORY_TABLE } = require('../models/categories.model');
const { ProductSchema, PRODUCT_TABLE } = require('../models/products.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    // crear las tablas
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down (queryInterface, Sequelize) {
    // eliminar las tablas
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
