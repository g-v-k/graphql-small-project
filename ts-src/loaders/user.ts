import { UserModel } from '../database/models/user';
import { User } from '../dataTypes/index'

export const batchUsers = async (userIds: ReadonlyArray<unknown>) => {
    //console.log(userIds);
    const users: Array<User> = await UserModel.find({ _id: { $in: userIds } });
    //console.log(users[0]._id);
    return userIds.map(userId => users.find(user => {
        return user.id == userId
    }));
}