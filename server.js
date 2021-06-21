const express = require('express')

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
