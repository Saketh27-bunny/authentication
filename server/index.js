import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); 
// Enables cross-origin requests from React
app.use(express.json()); 

// connect to mongoDB
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB as connected"))
.catch((err)=> console.log('MongoDB connection error',err));


// Base Test Route

app.get('/', (req, res) => {
  res.send('API is running...');
});

// register api
app.post('/api/register',async(req,res)=>{
  try{
    const { fullName,email,password}=req.body;
    if(!fullName || !email || !password){
      return res.status(400).json({message:"All fields are required"})
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message:"User already exist"})
    }
    const newUser= await User.create({fullName,email,password})
    
    return res.status(201).json({
      message:"Registration completed",
      user:{id:newUser._id, fullName:newUser.fullName,email:newUser.email,password:newUser.password},
    });
  }
catch(error){
  console.log("register error",error);
}
})
app.post('/api/login',async(req,res)=>{
  try{
    const {email,password}=req.body;
    if(!email || !password){
      return res.status(400).json({message:"All fields are required"})
    }
    const existingUser=await User.findOne({email,password})
    if(existingUser){
      return res.status(200).json({message:"Login successfull"})
    }
    return res.status(401).json({
      message:"Login failed",
    })
  }catch(e){
    console.log("Login error",e);

  }
})

// Start Server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
