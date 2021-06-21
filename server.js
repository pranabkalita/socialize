const express = require('express')
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/socialize', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Database. Hurray !')
  })
  .catch((error) => {
    console.log(`Error connecting database: ${error}`)
  })

const app = express()

app.get('/', (req, res) => {
  res.send('HOME PAGE !')
})

app.get('/about', (req, res) => {
  res.send('ABOUT PAGE !')
})

app.get('/contact', (req, res) => {
  res.send('CONTACT PAGE !')
})

app.listen(3000, () => {
  console.log(`Server running at PORT: 3000`)
})
