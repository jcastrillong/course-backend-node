const { Model , DataTypes, Sequelize } = require("sequelize");

const { CUSTOMER_TABLE } = require("./customers.model");

const ORDER_TABLE = "orders";

const OrderSchema = {
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
}

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: "customer" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: "Order",
      timestamps: false,
    };
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };