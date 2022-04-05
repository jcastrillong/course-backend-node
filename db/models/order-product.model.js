const { Model, DataTypes, Sequelize } = require("sequelize");

const { ORDER_TABLE } = require("./orders.model");
const { PRODUCT_TABLE } = require("./products.model");

const ORDER_PRODUCT_TABLE = "orders_products";

const OrderProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "order_id",
    reference: {
      model: ORDER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "product_id",
    reference: {
      model: PRODUCT_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
};

class OrderProduct extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: "OrderProduct",
      timestamps: false,
    };
  }
}

module.exports = {
  OrderProduct,
  OrderProductSchema,
  ORDER_PRODUCT_TABLE,
}