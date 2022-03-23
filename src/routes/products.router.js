const { Router } = require("express");

const ProductsService = require("../services/products.service");

const router = Router();
const service = new ProductsService();

// enviando json
router.get("/", (req, res) => {
  const products = service.find();
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
router.get("/:id", (req, res) => {
  const { id } = req.params; // obteniendo los parametros
  const product = service.findOne(id);
  res.json(product);
});

router.post("/", (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json({
    message: "Created",
    data: newProduct,
  });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json({
    message: "Updated",
    product,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json({
    message: "Deleted",
    rta,
  });
});

module.exports = router;
