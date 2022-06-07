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
  currentExercise: [exerciseSchema],
  goalExercise: [exerciseSchema],
  currentMeal: [mealSchema],
  goalMeal: [mealSchema]
});

module.exports = { goalSchema };