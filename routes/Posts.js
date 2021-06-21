const express = require('express')

// Controllers
const PostsController = require('./../controllers/PostsController')

const router = express.Router()

router.get('/', PostsController.getAll)
router.get('/:slug', PostsController.getOne)
router.post('/', PostsController.create)
router.patch('/:slug', PostsController.updateOne)
router.delete('/:slug', PostsController.delete)

module.exports = router
