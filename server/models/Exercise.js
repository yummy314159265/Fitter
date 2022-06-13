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
    type: String,
  },
  time: {
    type: String,
  },
  reps: {
    type: String,
  },
  sets: {
    type: String,
  },
  liftingWeight: {
    type: String,
  },
});

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;