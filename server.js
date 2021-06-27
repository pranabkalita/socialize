// Global Imports
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: './.env' })

// Project Import
const database = require('./config/database')
const viewsRouter = require('./routes/Views')
const postsRouter = require('./routes/Posts')
const usersRouter = require('./routes/Users')
const tagsRouter = require('./routes/Tags')

// Database connection
database.connect()

// Fire up server
const app = express()

// Static file config
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', viewsRouter)
app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
app.use('/api/tags', tagsRouter)

// Listen to Server
const PORT = process.env.APP_PORT
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`)
})
