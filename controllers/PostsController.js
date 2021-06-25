const validator = require('express-validator')

const Post = require('./../models/Post')

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find({ isPublished: true }).sort('-createdAt')

    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    })
  } catch (error) {
    console.warn('Error: ', error)

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error creating post !',
      },
    })
  }
}

exports.getOne = async (req, res) => {
  try {
    const { slug } = req.params

    const post = await Post.findOne({ slug }).populate('user')

    if (!post) {
      res.status(400).json({
        status: 'fail',
        data: {
          message: 'Post not found !',
        },
      })
    }

    post.user.password = undefined
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    })
  } catch (error) {
    console.warn('Error: ', error)

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error creating post !',
      },
    })
  }
}

exports.create = async (req, res) => {
  try {
    const errors = validator.validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'Post creation failed !',
          errors: errors.array(),
        },
      })
    }

    const { title, body } = req.body
    const { _id } = req.user
    const post = await Post.create({ user: _id, title, body })

    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    })
  } catch (error) {
    console.warn('Error: ', error)

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error creating post !',
      },
    })
  }
}

exports.updateOne = async (req, res) => {
  try {
    const { slug } = req.params

    const post = await Post.findOne({ slug })
    console.log('POST: ', post)

    if (!post) {
      res.status(400).json({
        status: 'fail',
        data: {
          message: 'Post not found !',
        },
      })
    }

    post.title = req.body.title
    post.body = req.body.body
    await post.save({ validateBeforeSave: false })

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    })
  } catch (error) {
    console.warn('Error: ', error)

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error creating post !',
      },
    })
  }
}

exports.delete = async (req, res) => {
  try {
    const { slug } = req.params

    const post = await Post.findOne({ slug })

    if (!post) {
      res.status(400).json({
        status: 'fail',
        data: {
          message: 'Post not found !',
        },
      })
    }

    await post.remove()

    res.status(204).json({
      status: 'success',
    })
  } catch (error) {
    console.warn('Error: ', error)

    res.status(201).json({
      status: 'fail',
      data: {
        message: 'Error creating post !',
      },
    })
  }
}
