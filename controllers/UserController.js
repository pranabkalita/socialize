const validator = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('./../models/User')

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('posts')

    res.status(200).json({
      status: 'success',
      data: { user },
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

exports.login = async (req, res) => {
  try {
    // 1. Check fir validation
    const errors = validator.validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'User Login Failed !',
          errors: errors.array(),
        },
      })
    }

    // 2. Check if the user exists and password is correct
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'User Login Failed !',
        },
      })
    }

    // 3. If everything is fine, Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_AT,
    })

    // 4. Send Response
    user.password = undefined
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
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

exports.register = async (req, res) => {
  try {
    const errors = validator.validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'User Registration Failed !',
          errors: errors.array(),
        },
      })
    }

    const { name, email, password } = req.body

    const user = await User.create({ name, email, password })

    user.password = undefined
    res.status(201).json({
      status: 'success',
      data: {
        user,
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

exports.logout = (req, res) => {
  res.send('Logout')
}
