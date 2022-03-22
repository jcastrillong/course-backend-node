const { Router } = require("express");

const router = Router();

// Varios parámetros => "/nameRoute/:firstParam/nameRoute2/:secondParam"
router.get("/:categoryId/products/:productId", (req, res) => {
  const { categoryId, productId } = req.params; // Obteniendo los parámetros
  res.json({
    categoryId,
    productId,
  });
});

module.exports = router;