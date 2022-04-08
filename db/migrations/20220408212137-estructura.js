"use strict";

// traer los modelos
const { UserSchema, USER_TABLE } = require("./../models/users.model");
const {
  CustomerSchema,
  CUSTOMER_TABLE,
} = require("./../models/customers.model");
const {
  CategorySchema,
  CATEGORY_TABLE,
} = require("../models/categories.model");
const { ProductSchema, PRODUCT_TABLE } = require("../models/products.model");
const { OrderSchema, ORDER_TABLE } = require("../models/orders.model");
const {
  OrderProductSchema,
  ORDER_PRODUCT_TABLE,
} = require("./../models/order-product.model");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "customer_id",
        references: {
          model: CUSTOMER_TABLE,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  },
};
