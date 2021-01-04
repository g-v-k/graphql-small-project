import mongoose from 'mongoose';

const task = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},);

export const TaskModel = mongoose.model('Tasks',task);