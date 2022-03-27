const { Router } = require("express");

const ProductsService = require("../services/products.service");
const validatorHandler = require("../middlewares/validator.handler");

const router = Router();
const service = new ProductsService();

// enviando json
router.get("/", async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// Específico
router.get("/filter", (req, res) => {
  res.send("Yo soy un filter");
});

/* Rutas que reciben parámetros
 * Tipo params
 * Solo un parámetro => "/nameRoute/:param" */
// Dinámico
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params; // obteniendo los parametros
    const product = await service.findOne(id);
    res.json(product);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: "Created",
    data: newProduct,
  });
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json({
      message: "Updated",
      product,
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json({
      message: "Deleted",
      rta,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
