const validator = require('express-validator')

exports.register = [
  validator.check('name', 'A user must have a name.').notEmpty(),
  validator.check('email', 'User must provide a valid email.').isEmail(),
  validator
    .check('password', 'User must provide a string password.')
    .notEmpty(),
  validator
    .check('confirmPassword', 'Passwords must match.')
    .custom(async (confirmPassword, { req }) => {
      const { password } = req.body

      if (password !== confirmPassword) {
        throw new Error('Password does not match !')
      }
    }),
]
