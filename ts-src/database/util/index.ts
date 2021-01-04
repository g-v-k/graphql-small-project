import mongoose from 'mongoose';

export const connection = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI!,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
        mongoose.set('useFindAndModify',false);
        console.log("database connected successfully");
    }catch(e){
        console.log(e);
    }
    
} 

export const isValidObjectId = (id:string)=>{
    return mongoose.Types.ObjectId.isValid(id);
}