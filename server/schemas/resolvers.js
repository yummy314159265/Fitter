 const { User, Post } = require('../models');
// // //const { AuthenticationError } = require('apollo-server-express');
// // // const { signToken } = require('../utils/auth');

 const resolvers = {

  Query: {
    users: async () => {
      // Populate the meal and exercise subdocuments when querying for user
      return await User.find({})
        .populate('goals')
        .populate('exercisePlan')
        .populate('mealPlan')
        .populate('posts')
        .populate('friends');
    },
    posts: async () => {
      return await Post.find({});
    },
    meals: async () => {
      return await User.find({})
        .populate('mealPlan');
    },
    exercises: async () => {
      return await User.find({})
        .populate('exercisePlan');
    },
    goals: async () => {
      return await User.find({})
        .populate('goals');
    },
    me: async (id) => {
      return await User.findOne({_id: id})
    },
  },

}

 module.exports = resolvers;


   // cant work following as we dont have Meal model
                // meals: async () => {            
                //     return await Meal.find({});
                // },

         // cant work following as we dont have Exercise model
        //    exercises: async () => {            
        //         return await Exercise.find({});
        //     },

//         // cant work following as we dont have Goal model, also we've two refreence for meal and exercise in 
//         // goal, how to query that?
//         // goals: async () => {
//         //     //  Populate the meal and exercise subdocuments when querying for goal
//         //     return await Goal.find({}).populate('meals').populate('exercises');
//         //   },
//       }