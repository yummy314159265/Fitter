const { Schema } = require('mongoose');

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = tagSchema;