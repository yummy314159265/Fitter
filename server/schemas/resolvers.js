 const { User, Post } = require('../models');
 const { AuthenticationError } = require('apollo-server-express');
 const { signToken } = require('../utils/auth'); 

 const resolvers = {
     Query: {
        users: async () => {
          // Populate the meal and exercise subdocuments when querying for user
          return await User.find({}).populate('goals').populate({
            path: 'goals',
            populate: 'meals'
          }).populate({
            path: 'goals',
            populate: 'exercises'
          });
        },     
        // Query array of subdocs: https://www.mongodb.com/docs/v5.2/tutorial/query-array-of-documents/
        meal: async (parent, args) => {
          return await User.find({
            mealPlan: {calories: args.calories}
          });            
        },  
        exercise: async (parent, args) => {
          return await User.find({
            exercisePlan: {calories: args.calories}
          });            
        },  
  },   
  Mutation: {   
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);  
      return { token, user };
    },
  }
}
 module.exports = resolvers;
