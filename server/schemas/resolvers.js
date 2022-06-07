 const { User, Post } = require('../models');
 const { AuthenticationError } = require('apollo-server-express');
 const { signToken } = require('../utils/auth'); 

 const resolvers = {
     Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
        
        return userData;
          }
          throw new AuthenticationError('You need to be logged in!');
        },   
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
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
  }
}
 module.exports = resolvers;
