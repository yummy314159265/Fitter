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
     "user who choose private true will not be shared for anything with other users"
    private: Boolean
    "Store weight in lbs" 
    weight: Int
    "Store height in inches" 
    height: Int
    age: Int
    gender: String
    "user can have more than goals"
    goals: [Goal!]    
    "user can create post want to share with reference to exercise and meal plan"
    posts: [Post]
    friends: [User]
    exercisePlan: [Exercise]
    mealPlan: [Meal]
  }
    """
    Post Schema will store post user want to share with reference to exercise and meal plan
    """
  type Post {      
   id: ID!
   postAuthor: String!
   message: String!
   image: String
   createdAt: String
   exercises: [Exercise]
   meals: [Meal]
   tags: [Tag]
   comments: [Comment]
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
   calories: Int
   distance: Float
   time: String
   reps: Int
   sets: Int
   liftingWeight: Int
  }
  """
    Goal Schema will store goal user created
  """
  type Goal {
   id: ID!   
   currentWeight: Int
   goalWeight: Int
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
   """
    Tag Schema will use for Post
  """
  type Tag {
   id: ID!      
   name: String   
  }

  type Query {
    users: [User]
    posts: [Post]
    meals: [Meal]
    meal(calories: Int!): Meal
    exercises: [Exercise]
    exercise(calories: Int!): Exercise
    goals: [Goal]
    me: User
  }
  
  type Mutation {
    addUser(
      username: String!, 
      password: String!, 
      email: String!, 
      private: Boolean!,
      weight: Int!,
      height: Int!,
      age: Int!,
      gender: String!
      ): User
    # addPost
    # addExercisePlan
    # addMealPlan
    # addGoals
    # addComment
  }`;

module.exports = typeDefs;