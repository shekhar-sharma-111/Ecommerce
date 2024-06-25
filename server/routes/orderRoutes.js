const { Router } = require("express");
const {
  createOrder,
  cancelOrder,
  getOrderByUserId,
  getOrderById,
} = require("../controller/orderController");
const router = Router();

router.route("/order/create").post(createOrder);
router.route("/order/all/:userId").get(getOrderByUserId);
router.route("/order/:id").get(getOrderById);
router.route("/order/cencel/:orderId").put(cancelOrder);
module.exports = router;
