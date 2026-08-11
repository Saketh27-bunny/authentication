import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); 
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URL,
  }),
  cookie:{
    maxAge: 1000*60*60*24,
    httpOnly:true,
    secure:false,
  }
}))
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
    const user=await User.findOne({email,password})
    if(!user){
      return res.status(400).json({message:"Invalid email or password"})
    }
    req.session.userId=user._id;
    req.session.user={ id:user.id,fullName:user.fullName,email: user.email};
    return res.status(200).json({
      message:"Login failed", user:req.session.user
    });
  }catch(e){
    console.log("Login error",e);
  }
})

app.get('/api/check-session',(req,res)=>{
  if(req.session && req.session.user){
    return res.status(200).json({ isAuthenticated: true, user: req.session.user });
  }
  return res.status(401).json({ isAuthenticated: false, message: "Not authenticated" });
})

// Start Server
app.post('/api/logout',(req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      return res.status(500).json({message:"Could not log out"})
    }
    res.clearCookie('connect.sid');
    return res.status(200).json({message:"Logged out successfull"})
  });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
