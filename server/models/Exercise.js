const { Schema } = require('mongoose');

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: [String],
  },
  calories: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  time: {
    type: Date,
  },
  reps: {
    type: Number,
  },
  sets: {
    type: Number,
  },
  liftingWeight: {
    type: Number,
  },
});

module.exports = { exerciseSchema };