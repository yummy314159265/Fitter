const { Schema, model } = require('mongoose');

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

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;