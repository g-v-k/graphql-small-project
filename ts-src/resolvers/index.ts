import {userResolvers} from './user.js';
import {taskResolvers} from './task.js';
import { IResolvers } from 'apollo-server-express';

export const resolvers: Array<IResolvers> = [userResolvers,taskResolvers];