import {gql} from 'apollo-server-express';

export const userTypeDefs = gql`
 extend type Query{
     user:User
 }
 type User{
     id:ID!
     name:String!
     email:String!
     tasks:[Task!]
 }
 input signUpInput{
     name:String!
     email:String!
     password:String!
 }
 input loginInput{
     email:String!
     password:String!
 }
 extend type Mutation{
    signUp(input:signUpInput):User
    login(input:loginInput):Token
 }
 type Token{
     token:String!
 }
`;