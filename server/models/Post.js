const { Schema, model } = require('mongoose');
const { commentSchema } = require('./Comment');
const { formatDate } = require('../utils/helpers.js');

const postSchema = new Schema(
  {
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
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
      },
    ],
    meals: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Meal',
      },
    ],
    tags: [
      {
        type: String,
      }
    ],
    usersLiked: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [commentSchema],
  },
  {
    toJSON: {
      getters: true,
    }
  },
);

const Post = model('Post', postSchema);

module.exports = Post;