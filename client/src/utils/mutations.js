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
        $private: Boolean!,
        $weight: Int!,
        $height: Int!,
        $age: Int!,
        $gender: String!
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