const express = require('express')
const mongoose = require('mongoose')
const { Schema } = mongoose

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

const postSchema = new Schema(
  {
    title: String,
    slug: String,
    body: String,
    coverImage: String,
    images: [String],
    isDraft: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

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
