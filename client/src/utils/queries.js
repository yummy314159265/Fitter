import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      private
      weight
      height
      age
      gender
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
      mealPlan {
            id
            name
            type    
            calories
            proteins
            carbs
            fats
      }
      posts {
            id
            postAuthor
            message
            likes
            exercises {
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
            meals {
                id
                name
                type    
                calories
                proteins
                carbs
                fats
            }
            tags {
                id
                name
            }
            comments {
                commentAuthor
                message
                image
                likes
                tags {
                id
                name
                }   
                createdAt
            }
            createdAt
      }
    }
  }
`;
