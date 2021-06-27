const express = require('express')

// Controllers
const PostsController = require('./../controllers/PostsController')

// Validators
const PostValidators = require('./../validators/PostValidators')

// Middlewares
const AuthMiddleware = require('./../middlewares/AuthMiddleware')
const PostImageUpload = require('./../middlewares/PostImageUpload')

const router = express.Router()

router.get('/', PostsController.getAll)
router.get('/:slug', PostsController.getOne)
router.post(
  '/',
  AuthMiddleware.protect,
  PostImageUpload.uploadPostImage,
  PostValidators.create,
  PostsController.create
)
router.patch('/:slug', AuthMiddleware.protect, PostsController.updateOne)
router.delete('/:slug', AuthMiddleware.protect, PostsController.delete)

module.exports = router
