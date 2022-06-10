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