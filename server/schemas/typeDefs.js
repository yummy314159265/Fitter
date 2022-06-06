const { gql } = require('apollo-server-express');

const typeDefs = gql`
    """
    User Schema will store registered user vital information and references to other schemas
    User can login with database username/password or passport authentication
    goals - user can set more than one goal
    exercise and meal - each goal will have related exercise and meal plan
    """
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    "user can have more than goals"
    goals: [Goal!]
    "user can create post want to share with reference to exercise and meal plan"
    posts: [Post]
    exercisePlan: [Exercise]
    mealPlan: [Meal]
    friends: [User]
    "user who choose private true will not be shared for anything with other users"
    private: Boolean
    "Store weight in centimeters" 
    weight: Int
    height: Int
    age: Int
    gender: String
  }
    """
    Post Schema will store post user want to share with reference to exercise and meal plan
    """
  type Post {      
   id: ID!
   user: User!      
   message: String!
   image: String
   exercises: [Exercise]
   meals: [Meal]
   tags: String
   comments: [Comments]
   likes: Int
  }
    """
    Meal Schema will store meal plan user created
    """
  type Meal {
   id: ID!   
   name: String
   type: String
  "Following macronutrients are per complete meal and not per individual intake"
   calories: Int
   proteins: Int
   carbs: Int
   fats: Int
  }
  """
    Exercise Schema will store exercise plan user created
  """
  type Exercise {
   id: ID!   
   name: String!
   type: String
   caloriesBurned: Int
   distanceTraveled: Float
   stratDate: Date
   reps: Int
   sets: Int
   liftingWeight: Int
  }
  """
    Goal Schema will store goal user created
  """
  type Goal {
   id: ID!   
   currentExercise: [Exercise]
   goalExercise: [Exercise]
   currentMeal: [Meal]
   goalMeal: [Meal]
  }
  """
    Comment Schema will use for Post
  """
  type Comment {
   id: ID!   
   user: User   
   message: String!
   image: String
   likes: Int
  }
`;

module.exports = typeDefs;
