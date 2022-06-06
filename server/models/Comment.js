const { Schema } = require('mongoose');
const { tagSchema } = require('./Tag');

const commentSchema = new Schema({
  commentAuthor: {
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
  tags: [tagSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = commentSchema;