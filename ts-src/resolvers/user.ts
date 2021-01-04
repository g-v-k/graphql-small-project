import { UserModel } from '../database/models/user';
import { TaskModel } from '../database/models/task';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './middleware/index'

export const userResolvers = {
    Query: {
        user: combineResolvers(isAuthenticated, async (_: any, args: any, { Id }: any) => {
            try {
                const user = await UserModel.findOne({ _id: Id });
                if (!user) {
                    throw new Error("User not Found");
                }
                return user;
            } catch (err) {
                console.log(err);
                throw err;
            }
        }) as any

    },
    Mutation: {
        signUp: async (_: any, { input }: any) => {
            const user = await UserModel.findOne({ email: input.email }).exec();
            if (user) {
                throw new Error("Email exists");
            }
            const hashedPassword = await bcrypt.hash(input.password, 10);
            const newUser = new UserModel({ ...input, password: hashedPassword });
            return await newUser.save();
        },
        login: async (_: any, { input }: any) => {
            try {
                const user = await UserModel.findOne({ email: input.email });
                if (!user) {
                    throw new Error("Auth failed");
                }
                const passwordValid = await bcrypt.compare(input.password, user.password);

                if (!passwordValid) {
                    throw new Error("Auth failed");
                }
                const token = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_KEY!, { expiresIn: '1d' });
                return { token };

            } catch (err) {
                console.log(err);
                throw err;
            }
        }

    },
    User: {
        tasks: async (parent: any) => {
            try {
                const tasks = await TaskModel.find({ user: parent.id });
                return tasks;
            }catch(err){
                console.log(err);
                throw err;
            }
        }
    }
}