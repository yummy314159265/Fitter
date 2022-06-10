import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      id
      username
      email
      private
      weight
      height
      age
      gender 
      mealPlan {
            id
            name
            type
            calories
            proteins
            carbs
            fats
      }
      exercisePlan {
            id
            name
            type
            calories
            distance
            time
            reps
            sets
            liftingWeight
      }
      goals {
        goalWeight
        goalExercise {
            id
            name
            type
            calories
            distance
            time
            reps
            sets
            liftingWeight
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query posts {
    posts {
      postAuthor
      message
      likes
      exercises {
        name
        type
        calories
        distance
        time
        reps
        sets
        liftingWeight
      }
      meals {
        name
        type
        calories
        proteins
        carbs
        fats
      }
      tags
      comments {
        commentAuthor
        message
        image
        likes
        tags
        createdAt
      }
      createdAt
      image
    }
  }
`