const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const User = require('./../models/User')

exports.protect = async (req, res, next) => {
  // 1. Get the token from request header
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      data: {
        message: 'You are not authorized !',
      },
    })
  }

  // 2. Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)

  // 3. Check if user exists
  const user = await User.findById(decoded.id)

  if (!user) {
    return res.status(401).json({
      status: 'fail',
      data: {
        message: 'You are not authorized !',
      },
    })
  }

  // 4. Grant access to method
  next()
}
