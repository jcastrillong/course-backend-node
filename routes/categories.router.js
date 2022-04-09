const { Router } = require("express");
const passport = require("passport");

const CategoriesService = require("../services/categories.service");
const validatorHandler = require("../middlewares/validator.handler");
const { checkRoles } = require("./../middlewares/auth.handler");
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require("../schemas/categories.schema");

const router = Router();
const service = new CategoriesService();

// Varios parámetros => "/nameRoute/:firstParam/nameRoute2/:secondParam"
router.get("/", 
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.json({
        message: "Created",
        data: newCategory,
      });
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json({
        message: "Updated",
        data: category,
      });
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.delete(id);
      res.json({
        message: "Deleted",
        data: category,
      });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
