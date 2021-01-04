import express from 'express';
import jwt from 'jsonwebtoken';
import {UserModel} from '../../database/models/user'
export const verifyUser = async(req: express.Request) => {
    try {
        req.userId = null;
        const bearerHeader = req.headers.authorization;
        if (bearerHeader) {
            const token = bearerHeader.split(' ')[1];
            const payload:any = jwt.verify(token, process.env.JWT_KEY!);

            const user = await UserModel.findOne({name:payload.name});
            req.userId = user.id;
        }
    } catch (err) {
        throw err;
    }
};