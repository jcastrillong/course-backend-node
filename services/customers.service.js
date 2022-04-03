const boom = require("@hapi/boom");

const models = require("./../libs/sequelize");

class CustomerService {
  constructor() {}

  async create(body) {
    const newCustomer = await models.Customer.create(body);
    return newCustomer;
  }

  async find() {
    const customers = await models.Customer.findAll();
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound("Customer not found");
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const customerUpdated = await customer.update(changes);
    return customerUpdated;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy(id);
    return { id };
  }
}

module.exports = CustomerService;