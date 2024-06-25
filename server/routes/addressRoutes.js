const { Router } = require('express');
const {
    getAllAddress,
    // getAddressById,
    createAddress,
    deleteAddress,
    // updateAddress,
} = require('../controller/addressController');

const router = Router();

router.route("/address").get(getAllAddress);
// router.route("/address/:id").get(getAddressById);
router.route("/address/create").post(createAddress);
router.route("/address/delete/:id").delete(deleteAddress); // Include ":id" as a parameter
// router.route("/address/update").put(updateAddress);

module.exports = router;
