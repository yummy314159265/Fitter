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
      usersLiked {
        id
      }
    }
  }
`;

export const GET_POST = gql`
  query post(
    $postId: ID!
  ) {
    post(
      postId: $postId
    ) {
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
      tags
      comments {
        commentId
        commentAuthor
        message
        image
        likes
        tags
        createdAt
        usersLiked {
          id
          username
        }
      }
      createdAt
      image
      usersLiked {
        id
      }
    }
  }
`;