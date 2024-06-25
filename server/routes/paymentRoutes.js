const { Router } = require('express')
const {
    makePayment,
  } = require('../controller/paymentController');
const router = Router()

router.route('/payment').post(makePayment);
module.exports = router