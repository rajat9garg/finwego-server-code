const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller");
const usermiddleware = require("../middlewares/user.middleware")


router.post("/user_add",usermiddleware.uservalidation,userController.user)

module.exports = router