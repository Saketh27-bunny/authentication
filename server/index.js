import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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

// Sample Login Endpoint

// Start Server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
