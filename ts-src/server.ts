import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import * as dotenv from 'dotenv';

import {resolvers} from './resolvers'
import {typeDefs} from './typeDefs'
import cors from 'cors';
import {connection} from './database/util'
import {verifyUser} from './helper/context'
import * as loaders from './loaders';
import Dataloader from 'dataloader';

//set environment variables
dotenv.config();

const app = express();

connection();


app.use(cors());
app.use(express.json());

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context:async ({req})=>{
        await verifyUser(req);
        return {
            userId: req.userId,
            loaders:{
                user:new Dataloader(keys=>loaders.user.batchUsers(keys))
            }
        }
    }
})

apolloServer.applyMiddleware({app,path:'/graphql'});
app.get('/',(req,res,next)=>res.send({message:"Hello world"}));

const PORT = process.env.PORT || 3000 ;

app.listen(PORT);