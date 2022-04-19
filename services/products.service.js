const boom = require('@hapi/boom')
const { Op } = require('sequelize')

const { models } = require('../libs/sequelize')

class ProductsService {
  // crear un producto
  async create (data) {
    const newProduct = await models.Product.create(data)
    return newProduct
  }

  async find (query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { price } = query

    if (price) {
      options.where.price = price
    }

    const { price_min, price_max } = query

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }

    const products = await models.Product.findAll(options)
    return products
  }

  async findOne (id) {
    const product = await models.Product.findByPk(id)
    if (!product) {
      throw boom.notFound('Product not found')
    }
    return product
  }

  async update (id, changes) {
    const product = await this.findOne(id)
    const productUpdated = await product.update(changes)
    return productUpdated
  }

  async delete (id) {
    const product = await this.findOne(id)
    await product.destroy(id)
    return { id }
  }
}

module.exports = ProductsService
