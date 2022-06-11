import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      id
      username
      email
      isPrivate
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

      posts {
            id
            postAuthor
            message
            createdAt
            likes
            tags                                
      } 

    }
  }
`;

export const GET_POSTS = gql`
  query posts {
    posts {
      id
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
`;