import { skip } from 'graphql-resolvers';
import { TaskModel } from '../../database/models/task'
import {isValidObjectId} from '../../database/util'

export const isAuthenticated = (_: any, __: any, { userId }: any) => {
    if (!userId) {
        throw new Error("Authentication required");
    }
    return skip;
};

export const isTaskOwner = async (_: any, { taskId }: any, { userId }: any) => {
    try {
        if(!isValidObjectId(taskId)){
            throw new Error("Invalid Task ID");
        }
        const task = await TaskModel.findOne({ _id: taskId });
        if (!task) {
            throw new Error("Task not found");
        } else if (task.user.toString() !== userId) {
            throw new Error("Not Authorized");
        }
        return skip;
    } catch (err) {
        console.log(err);
        throw err;
    }
}