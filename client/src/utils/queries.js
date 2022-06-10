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
<<<<<<< HEAD
      posts {
            id
            postAuthor
            message
            createdAt
            likes
            tags                                
      } 
=======
>>>>>>> 641324223ed91640c1a4330505414bf72a76c499
    }
  }
`;