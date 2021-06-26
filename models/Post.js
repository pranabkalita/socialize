const mongoose = require('mongoose')
const slugify = require('slugify')
const { Schema } = mongoose

const postSchema = new Schema(
  {
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    title: { type: String, unique: true },
    slug: { type: String, unique: true },
    body: String,
    coverImage: String,
    images: [String],
    isDraft: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  },
  {
    timestamps: true,
  }
)

postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })

  next()
})

postSchema.pre('remove', async function (next) {
  await this.model('Tag').updateMany(
    { posts: this._id },
    { $pull: { posts: this._id } },
    { multi: true },
    next
  )
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
