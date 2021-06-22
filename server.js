// Global Imports
const express = require('express')

// Project Import
const database = require('./config/database')
const viewsRouter = require('./routes/Views')
const postsRouter = require('./routes/Posts')
const usersRouter = require('./routes/Users')

// Database connection
database.connect()

// Fire up server
const app = express()
app.use(express.json())

// Routes
app.use('/', viewsRouter)
app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)

// Listen to Server
app.listen(3000, () => {
  console.log(`Server running at PORT: 3000`)
})
