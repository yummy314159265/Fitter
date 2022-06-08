const { User, Exercise, Meal, Post } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth'); 

const resolvers = {
    Query: {
       me: async (parent, args, context) => {
         if (context.user) {
           const userData = await User.findOne({ _id: context.user._id })
           .populate('mealPlan')
           .populate('exercisePlan')
           .populate('goals')
           .populate('posts')
           .populate('friends')
           .select('-__v -password')              
            return userData;
         }
         throw new AuthenticationError('You need to be logged in!');
       },   
       users: async () => {
         // Populate the meal and exercise subdocuments when querying for user
         return await User.find({}).populate('goals');
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
   // add new user
   addUser: async (parent, args) => {
     const user = await User.create(args);
     const token = signToken(user);  
     return { token, user };
   },
   // login 
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
   // add exercise plan
   addExercise: async (parent, args, context) => {
     if (!context.user) throw new AuthenticationError("You must be logged in to add Exercise plan!");
     const exercise = await Exercise.create(args);
     const exerciseId = exercise.id;
     const updatedUser = await User.findByIdAndUpdate(
       { _id: context.user._id },
       { $addToSet: { exercisePlan: exerciseId } },
       { new: true }
     );
     return updatedUser;
   },
   // add meal plan
   addMeal: async (parent, args, context) => {
     if (!context.user) throw new AuthenticationError("You must be logged in to add Meal plan!");
     const meal = await Meal.create(args);
     const mealId = meal.id;
     const updatedUser = await User.findByIdAndUpdate(
       { _id: context.user._id },
       { $addToSet: { mealPlan: mealId } },
       { new: true }
     );
     return updatedUser;
   },
   // add goal plan
   addGoal: async (parent, { input }, context) => {
     if (!context.user) throw new AuthenticationError("You must be logged in to add Goal!");      
     const updatedUser = await User.findByIdAndUpdate(
       { _id: context.user._id },
       { $addToSet: { goals: input } },
       { runValidators: true, new: true }
       );
     return updatedUser;
   },
   // add post
   addPost: async (parent, args, context) => {
    if (!context.user) throw new AuthenticationError("You must be logged in to add Meal plan!");
    const post = await Post.create(args);
    const postId = post.id;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: context.user._id },
      { $addToSet: { posts: postId } },
      { new: true }
    );
    return updatedUser;
  },
    // add comment to post
    addComment: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError("You must be logged in to add Meal plan!");      
      const updatePost = await Post.findByIdAndUpdate(
        { _id: args.postId },
        { $addToSet: { comments: args.input } },
        { new: true }
      );
      return updatePost;
    },
 }
}
module.exports = resolvers;
