import mongoose from 'mongoose';

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Task'
        }
    ]
});

export const UserModel = mongoose.model('Users',user);