import { TaskModel } from '../database/models/task';
import { UserModel } from '../database/models/user';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isTaskOwner } from './middleware/index';
import { IResolvers } from 'apollo-server-express';
import {Task} from '../dataTypes/index';
import {base64ToString,stringToBase64} from '../helper/index';

export const taskResolvers: IResolvers = {
    Query: {
        //skip, limit for pagination
        tasks: combineResolvers(isAuthenticated, async (_, { cursor, limit = 10 }, { userId }) => {
            try {
                const query: any = { userId: userId };
                if (cursor) {
                    query['_id'] = {
                        $lt: base64ToString(cursor)
                    }
                }
                let tasks:Array<Task> = await TaskModel.find(query).sort({ _id: -1 }).limit(limit + 1);
                const hasNextPage = tasks.length > limit;
                tasks = hasNextPage ? tasks.slice(0,-1):tasks;
                return {
                    taskFeed:tasks,
                    pageInfo:{
                        nextPageCursor:hasNextPage?stringToBase64(tasks[tasks.length-1].id):null,
                        hasNextPage
                    }
                };
            } catch (err) {
                console.log(err);
                throw err;
            }
        }) as any,
        task: combineResolvers(isAuthenticated, isTaskOwner, async (_, { Id }) => {
            try {
                return await TaskModel.findOne({ _id: Id });

            } catch (err) {
                console.log(err);
                throw err;
            }
        }) as any
    },
    Mutation: {
        createTask: combineResolvers(isAuthenticated, async (_, { input }, { userId }) => {
            try {
                const user = await UserModel.findOne({ _id: userId });
                const task = new TaskModel({ ...input, userId: userId });
                const result = await task.save();
                user.tasks.push(result.id);
                await user.save();
                return result;
            } catch (err) {
                console.log(err);
                throw err;
            }

        }) as any,
        updateTask: combineResolvers(isAuthenticated, isTaskOwner, async (_, { Id, input }, __) => {
            try {
                return await TaskModel.findOneAndUpdate({ _id: Id }, { ...input }, { new: true });
            } catch (err) {
                console.log(err);
                throw err;
            }
        }) as any,
        deleteTask: combineResolvers(isAuthenticated, isTaskOwner, async (_, { Id }, { userId }) => {
            try {
                const deletedTask = await TaskModel.findOneAndDelete({ _id: Id });
                await UserModel.updateOne({ _id: userId }, { $pull: { tasks: Id } });
                return deletedTask;
            } catch (err) {
                console.log(err);
                throw err;
            }

        }) as any
    },
    Task: {
        user: async (parent,__,{loaders}) => {
            try {
                //return await UserModel.findOne({ _id: parent.userId });
                return await loaders.user.load(parent.userId.toString());
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    }
}