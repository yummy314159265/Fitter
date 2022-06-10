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
                private
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
        $private: Boolean,
        $weight: Int,
        $height: Int,
        $age: Int,
        $gender: String
        ) {
        addUser(
        username: $username,
        password: $password,
        email: $email, 
        private: $private,
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
        $private: Boolean, 
        $weight: Int,
        $height: Int, 
        $age: Int, 
        $gender: String
        ) {
        updateUser(        
            username: $username, 
            email: $email, 
            private: $private, 
            weight: $weight, 
            height: $height, 
            age: $age, 
            gender: $gender
        )
        {
            username,
            email,
            private,
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
        $postAuthor: String!,
        $message: String!,
        $exercises: [String],
        $meals: [String],
        $tags: [String],
        $createdAt: String
    ) {
        addPost(
            postAuthor: $postAuthor,
            message: $message,
            exercises: $exercises,
            meals: $meals,
            tags: $tags,
            createdAt: $createdAt
        ) {
           id
           postAuthor
           message
           likes
           exercises
           meals
           tags
           comments
           createdAt
        }
    }
`;

export const ADD_COMMENT = gql` 
    mutation addComment(
        $postId: ID!,
        $input: commentInput
    ) {
        addComment(
            postId: $postId,
            input: $input
        ) {
            id
            message
            comments
        }
    }
`;