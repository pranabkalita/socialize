const express = require('express')

// Controllers
const UserController = require('../controllers/UserController')

// Validators
const AuthValidators = require('../validators/AuthValidators')

const router = express.Router()

router.post('/login', UserController.login)
router.post('/register', AuthValidators.register, UserController.register)
router.post('/logout', UserController.logout)

module.exports = router
