import {gql} from 'apollo-server-express';

export const taskTypeDefs = gql`
 extend type Query{
     tasks(cursor:String,limit:Int):TaskFeed!
     task(Id:ID!):Task
 }

 type TaskFeed{
     taskFeed:[Task!]
     pageInfo:PageInfo!
 }

 type PageInfo{
    nextPageCursor:String
    hasNextPage:Boolean
 }

 input createTaskInput{
    name:String!
    completed:Boolean!
 }

 input updateTaskInput{
     name:String
     completed:Boolean
 }
 
 extend type Mutation{
     createTask(input:createTaskInput!):Task
     updateTask(Id:ID!,input:updateTaskInput!):Task
     deleteTask(Id:ID!):Task
 }
 type Task{
     id:ID!
     name:String!
     completed:Boolean!
     user:User!
 }
`;