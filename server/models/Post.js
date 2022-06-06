const { Schema, model } = require('mongoose');
const { mealSchema } = require('./Meal');
const { exerciseSchema } = require('./Exercise');
const { commentSchema } = require('./Comment');
const { tagSchema } = require('./Tag');

const postSchema = new Schema({
  postAuthor: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  image: {
    type: String,
  },  
  likes: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  exercises: [exerciseSchema],
  meals: [mealSchema],
  tags: [tagSchema],
  comments: [commentSchema],
});

const Post = model('Post', postSchema);

module.exports = Post;