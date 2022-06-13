import { gql } from '@apollo/client';
// validate user and return user info
export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                username
                email
                isPrivate
                weight
                height
                age
                gender
            }
        }
    }
`;

// add new user
export const ADD_USER = gql`
    mutation addUser(
        $username: String!, 
        $password: String!, 
        $email: String!, 
        $isPrivate: Boolean,
        $weight: Int,
        $height: Int,
        $age: Int,
        $gender: String
        ) {
        addUser(
        username: $username,
        password: $password,
        email: $email, 
        isPrivate: $isPrivate,
        weight: $weight,
        height: $height,
        age: $age,
        gender: $gender
        ) {
        token
            user {
                id
                username
                email                
            }
        }
    }
`;

// mutation to update user
export const UPDATE_USER = gql`
    mutation updateUser(
        $username: String!, 
        $email: String!, 
        $isPrivate: Boolean, 
        $weight: Int,
        $height: Int, 
        $age: Int, 
        $gender: String
        ) {
        updateUser(        
            username: $username, 
            email: $email, 
            isPrivate: $isPrivate, 
            weight: $weight, 
            height: $height, 
            age: $age, 
            gender: $gender
        )
        {
            username,
            email,
            isPrivate,
            weight,
            height,
            age,
            gender
        }
    }
`;

export const ADD_MEAL = gql`   
    mutation addMeal(
        $name: String!,
        $type: [String],
        $calories: Int,
        $proteins: Int,
        $carbs: Int,
        $fats: Int
    ) {
        addMeal(
            name: $name,
            type: $type,
            calories: $calories,
            proteins: $proteins,
            carbs: $carbs,
            fats: $fats
        ) {
            id
            name
            type
            calories
            proteins
            carbs
            fats
        }
    }
`;

export const ADD_EXERCISE = gql` 
    mutation addExercise(
        $name: String!,
        $type: [String],
        $calories: Int,
        $distance: Int,
        $time: String,
        $reps: Int,
        $sets: Int,
        $liftingWeight: Int
    ) {
        addMeal(
            name: $name,
            type: $type,
            calories: $calories,
            distance: $distance,
            time: $time,
            reps: $reps,
            sets: $sets,
            liftingWeight: $liftingWeight
        ) {
            id
            name
            type
            calories
            distance
            time
            reps
            set
            liftingWeight
        }
    }
`;

export const ADD_GOAL = gql` 
    mutation addGoal(
        $input: goalInput
    ) {
        addGoal(
            input: $input
        ) {
           id
           username
           goals
        }
    }
`;

export const ADD_POST = gql` 
    mutation addPOST(
        $input: postInput!
    ) {
        addPost(
            input: $input
        ) {
           id
           postAuthor
           message
           exercises {
               id
               name
               type
               distance
               time
               liftingWeight
               sets
               reps
               calories
           }
           meals {
               id
               name
               type
               calories
               fats
               carbs
               proteins
           }
           tags
           createdAt
        }
    }
`;

export const ADD_COMMENT = gql` 
    mutation addComment(
        $input: commentInput!
    ) {
        addComment(
            input: $input
        ) {
            id
            message
            comments {
                commentId
                commentAuthor
                message
                createdAt
                tags
                likes
            }
        }
    }
`;

export const UPDATE_LIKES = gql`
    mutation updateLikes(
        $postId: ID!
    ) {
        updateLikes(
            postId: $postId
        ) {
            likes
        }
    }
`;

export const UPDATE_COMMENT_LIKES = gql`
    mutation updateCommentLikes(
        $postId: ID!
        $commentId: ID!
    ) {
        updateCommentLikes(
            postId: $postId
            commentId: $commentId
        ) {
            comments {
                commentId
                likes
                usersLiked {
                    username
                }
            }
        }
    }
`;