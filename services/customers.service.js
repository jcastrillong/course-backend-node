const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const { models } = require('./../libs/sequelize')

class CustomerService {
  async create (data) {
    let newCustomer = {}
    if (data.user) {
      const hash = await bcrypt.hash(data.user.password, 10)

      const newData = {
        ...data,
        user: {
          ...data.user,
          password: hash
        }
      }
      newCustomer = await models.Customer.create(newData, {
        include: ['user']
      })
      delete newCustomer.user.dataValues.password
    } else if (data.userId) {
      newCustomer = await models.Customer.create(data)
    }
    return newCustomer
  }

  async find () {
    const customers = await models.Customer.findAll({
      include: ['user']
    })
    return customers
  }

  async findOne (id) {
    const customer = await models.Customer.findByPk(id)
    if (!customer) {
      throw boom.notFound('Customer not found')
    }
    return customer
  }

  async update (id, changes) {
    const customer = await this.findOne(id)
    const customerUpdated = await customer.update(changes)
    return customerUpdated
  }

  async delete (id) {
    const customer = await this.findOne(id)
    await customer.destroy(id)
    return { id }
  }
}

module.exports = CustomerService
