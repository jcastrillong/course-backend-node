const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const { models } = require('./../libs/sequelize')

class UsersService {
  async create (body) {
    const hash = await bcrypt.hash(body.password, 10)
    const newUser = await models.User.create({
      ...body,
      password: hash
    })
    /* no se debe devolver la contraseña a la hora de retornar
    los datos, por eso se elimina antes de retornarse pero,
    como se usa sequelize los valores vienen en dataValues
     */
    delete newUser.dataValues.password
    return newUser
  }

  async find () {
    const users = await models.User.findAll({
      include: ['customer']
    })
    return users
  }

  async findByEmail (email) {
    const user = await models.User.findOne({
      where: { email }
    })
    return user
  }

  async findOne (id) {
    const user = await models.User.findByPk(id)
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async update (id, changes) {
    const user = await this.findOne(id)
    const userUpdated = await user.update(changes)
    return userUpdated
  }

  async delete (id) {
    const user = await this.findOne(id)
    await user.destroy(id)
    return { id }
  }
}

module.exports = UsersService
