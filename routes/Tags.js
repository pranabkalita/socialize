const express = require('express')

// Controllers
const TagsController = require('./../controllers/TagsController')

// Validators
const TagValidators = require('./../validators/TagValidators')

// Middlewares
const AuthMiddleware = require('./../middlewares/AuthMiddleware')

const router = express.Router()

router.get('/', TagsController.getAll)
router.get('/:slug', TagsController.getOne)
router.post(
  '/',
  AuthMiddleware.protect,
  TagValidators.create,
  TagsController.create
)
router.patch('/:slug', AuthMiddleware.protect, TagsController.updateOne)
router.delete('/:slug', AuthMiddleware.protect, TagsController.delete)

module.exports = router
