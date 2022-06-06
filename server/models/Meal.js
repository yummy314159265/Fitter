const { Schema } = require('mongoose');

const mealSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: [String]
  },
  calories: {
    type: Number,
  },
  proteins: {
    type: Number
  },
  carbs: {
    type: Number
  },
  fats: {
    type: Number
  }
});

module.exports = mealSchema;