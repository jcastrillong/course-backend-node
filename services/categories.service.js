const boom = require("@hapi/boom");

const { models } = require("./../libs/sequelize");

class CategoriesService {
  constructor() {}

  // crear una categoria
  async create(body) {
    const newCategory = await models.Category.create(body);
    return newCategory;
  }

  // obtener todos los productos de una categoria
  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  // obtener una categoria por id
  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ["products"],
    });
    if (!category) {
      throw boom.notFound("Category not found");
    }
    return category;
  }

  // actualizar una categoria
  async update(id, changes) {
    const category = await this.findOne(id);
    const categoryUpdated = await category.update(changes);
    return categoryUpdated;
  }

  // borrar una categoria
  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy(id);
    return { id };
  }
}

module.exports = CategoriesService;