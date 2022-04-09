const { Router } = require("express");
const passport = require("passport");

const OrderService = require("../services/orders.service");

const router = Router();
const service = new OrderService();

router.get(
  "/my-orders",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
