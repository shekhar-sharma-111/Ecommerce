const { Router } = require('express')
const { signup, login,deleteUserProfile} = require("../controller/userController")
const router = Router()
router.route('/login').post(login)
router.route('/signup').post(signup)
router.route("/profile/delete").delete(deleteUserProfile)
module.exports = router