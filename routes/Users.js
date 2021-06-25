const express = require('express')

// Controllers
const UserController = require('../controllers/UserController')

// Validators
const AuthValidators = require('../validators/AuthValidators')

// Middlewares
const AuthMiddleware = require('./../middlewares/AuthMiddleware')

const router = express.Router()

router.get('/me', AuthMiddleware.protect, UserController.me)
router.post('/login', AuthValidators.login, UserController.login)
router.post('/register', AuthValidators.register, UserController.register)
router.post('/logout', UserController.logout)

module.exports = router
