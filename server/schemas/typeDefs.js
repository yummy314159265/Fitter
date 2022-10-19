const { gql } = require('apollo-server-express');

const typeDefs = gql`
    """
    User Schema will store registered user vital information and references to other schemas
    User can login with database username/password or passport authentication
    goals - user can set more than one goal
    exercise and meal - each goal will have related exercise and meal plan
    """

  # ----------Queries-----------
    
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
     "user who choose isPrivate true will not be shared for anything with other users"
    isPrivate: Boolean
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
   tags: [String]
   comments: [Comment]
   image: String
   createdAt: String   
   usersLiked: [User]
  }

    """
    Meal Schema will store meal plan user created
    """
  type Meal {
   id: ID!   
   name: String
   type: [String]
  "Following macronutrients are per complete meal and not per individual intake"
   calories: Float
   proteins: Float
   carbs: Float
   fats: Float
  }
  """
    Exercise Schema will store exercise plan user created
  """
  type Exercise {
   id: ID!   
   name: String!
   type: [String]
   calories: Float
   distance: String
   time: String
   reps: String
   sets: String
   liftingWeight: String
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
   commentId: ID!
   commentAuthor: String!   
   message: String!
   image: String
   likes: Int
   tags: [String]
   createdAt: String
   usersLiked: [User]   
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
    post(postId: ID!): Post
  }  

  #------------Mutations---------------

  # will use MealInout to add new post
  input MealInput {    
   name: String
   type: [String]
   calories: Float
   proteins: Float
   carbs: Float
   fats: Float
  }
  # will use ExerciseInput to add new goal and post
  input ExerciseInput {    
   name: String!
   type: [String]
   calories: Float
   distance: String
   time: String
   reps: String
   sets: String
   liftingWeight: String
  }
  # goalInput to add new goal with ExerciseInput
  input goalInput {
    goalWeight: Int
    goalExercise: [ExerciseInput]    
  }
  # postInput to add new post with MealInout and ExerciseInput
  input postInput {
    postAuthor: String!
    message: String!
    exercises: [ExerciseInput]
    meals: [MealInput]
    tags: [String]
  }
  # commentDetails input will be use in commentInput
  input commentDetails {
    commentAuthor: String!
    message: String!
    tags: [String]
  }
  # commentInput will be use to add new comment to post
  input commentInput {
    postId: ID!   
    commentDetails: commentDetails! 
    tags: [String]
  }  
  # Following defines mutation
  type Mutation {
    addUser(
      username: String!, 
      password: String!, 
      email: String!, 
      isPrivate: Boolean,
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
    # Update user information
    updateUser(       
      username: String!
      email: String!
      isPrivate: Boolean    
      weight: Int    
      height: Int
      age: Int
      gender: String
    ): User
    # Update Post with Likes
    updateLikes(
      postId: ID!
    ): Post
    # Update Comment with Likes
    updateCommentLikes(
      postId: ID!
      commentId: ID!
    ): Post
    # Delete Meal plan
    removeMeal(id: ID!): Meal       
    # Allow user to add goal plan
    addGoal(input: goalInput): User   
    # Allow user to add post
    addPost(input: postInput): Post  
    # Allow user to add comment
    addComment(input: commentInput!): Post
  }`;

module.exports = typeDefs;