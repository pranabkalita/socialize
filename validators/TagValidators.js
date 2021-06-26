const validator = require('express-validator')

exports.create = [
  validator.check('title', 'A Tag must have a title !').notEmpty(),
]
