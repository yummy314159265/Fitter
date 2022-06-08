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
    goals: [Goal]    
    exercisePlan: [Exercise]
    mealPlan: [Meal]
    "user can create post want to share with reference to exercise and meal plan"
    posts: [Post]
    friends: [User]    
  }
    """
    Post Schema will store post user want to share with reference to exercise and meal plan
    """
  type Post {      
   id: ID!
   postAuthor: String!
   message: String!
   likes: Int
   exercises: [Exercise]
   meals: [Meal]
   tags: [Tag]
   comments: [Comment]
   createdAt: String   
  }
    """
    Meal Schema will store meal plan user created
    """
  type Meal {
   id: ID!   
   name: String
   type: [String]
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
   type: [String]
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
   goalWeight: Int
   goalExercise: [Exercise]
  }
  """
    Comment Schema will use for Post
  """
  type Comment {
   commentAuthor: User!   
   message: String!
   image: String
   likes: Int
   tags: [Tag]
   createdAt: String   
  }
   """
    Tag Schema will use for Post
  """
  type Tag {
   id: ID!      
   name: String   
  }

  type Auth {
    token: ID!
    user: User
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
  # will use to add new goal
  input ExerciseInput {    
   name: String!
   type: [String]
   calories: Int
   distance: Float
   time: String
   reps: Int
   sets: Int
   liftingWeight: Int
  }
  input goalInput {
    goalWeight: Int
    goalExercise: [ExerciseInput]    
  }
  input commentInput {
    commentAuthor: String
    message: String
    image: String
    likes: Int
    tags: [String]
  }  
  # Following defines mutation
  type Mutation {
    addUser(
      username: String!, 
      password: String!, 
      email: String!, 
      private: Boolean,
      weight: Int,
      height: Int,
      age: Int,
      gender: String
      ): Auth
    # User authentication: Check for valid login using email and password
    login(email: String!, password: String!): Auth 
    # Allow user to add exercise plan
    addExercise(
      name: String!
      type: [String]
      calories: Int
      distance: Float
      time: String
      reps: Int
      sets: Int
      liftingWeight: Int
      ): Exercise  
     # Update user Exercise plan information
    updateExercise( 
      id: ID!   
      name: String!
      type: [String]
      calories: Int
      distance: Float
      time: String
      reps: Int
      sets: Int
      liftingWeight: Int
    ): Exercise
    # Delete Exercise plan
    removeExercise(id: ID!): Exercise 
    # Allow user to add meal plan
    addMeal(
      name: String!
      type: [String]
      calories: Int
      proteins: Int
      carbs: Int
      fats: Int
      ): Meal 
    # Update user Meal plan information
    updateMeal( 
      id: ID!   
      name: String
      type: [String]
      calories: Int
      proteins: Int
      carbs: Int
      fats: Int
    ): Meal
    # Delete Meal plan
    removeMeal(id: ID!): Meal       
    # Allow user to add goal plan
    addGoal(input: goalInput): User   
    # Allow user to add post
    addPost(
      postAuthor: String!
      message: String!
      exercises: [String]
      meals: [String]
      tags: [String]
      createdAt: String   
      ): Post  
    # Allow user to add comment
    addComment(postId: ID!, input: commentInput): Post
   
     
  }`;

module.exports = typeDefs;