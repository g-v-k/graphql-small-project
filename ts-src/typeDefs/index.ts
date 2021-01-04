import {userTypeDefs} from './user';
import {taskTypeDefs} from './task';
import {gql} from 'apollo-server-express';

const baseTypeDefs = gql`
 type Query{
    _:String
 }
 type Mutation{
    _:String
 }
`

export const typeDefs = [baseTypeDefs,taskTypeDefs,userTypeDefs];