import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js'
import CookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('MongoDb is connected');
})
.catch((err)=>{
    console.log(err);
})
// const app=express();
// app.use(express.json());

const app = express();

app.use(express.json());
app.use(CookieParser());



app.listen(3005, ()=>{
    console.log('server is runing on port 3005')
})

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment',commentRoutes);


app.use((err, req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});