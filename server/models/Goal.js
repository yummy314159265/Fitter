const { Schema } = require('mongoose');
const { exerciseSchema } = require('./Exercise');
const { mealSchema } = require('./Meal');

const goalSchema = new Schema({
  currentWeight: {
    type: Number,
  },
  goalWeight: {
    type: Number,
  },
  currentExercise: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
  },
  goalExercise: [exerciseSchema],
  currentMeal: {
    type: Schema.Types.ObjectId,
    ref: 'Meal',
  },
  goalMeal: [mealSchema]
});

module.exports = { goalSchema };