const { Schema, Types } = require('mongoose');

const { formatDate } = require('../utils/helpers.js');

const commentSchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
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
      default: 0
    },
    tags: [String],
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    usersLiked: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    }
  }
);

module.exports = { commentSchema };