const { Router } = require('express');
const {
    createOrUpdateCart,
    getAllCart,
    clearAllCart,
    removeItemInCart,
    IncreaseItem,
    DecreaseItem
} = require('../controller/cartController');

const router = Router();

router.route("/cart/create").post(createOrUpdateCart);
router.route("/cart/create/increase").put(IncreaseItem);
router.route("/cart/create/decrease").put(DecreaseItem);
router.route("/cart/:id").get(getAllCart);
router.route("/cart/delete").delete(clearAllCart);
router.route("/cart/remove").delete(removeItemInCart);

module.exports = router;
