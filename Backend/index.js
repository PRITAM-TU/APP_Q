const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv=require( 'dotenv');
const studentsSchema=require('./models/Students.models');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// MongoDB Connection Events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB cluster');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

// Routes
app.post('/login/home/quiz/submit', async (req, res) => {
  try {
    const { answers, result } = req.body;
    
    // Create a new quiz result document
    const quizResult = new QuizResult({
      score: result.score,
      total: result.total,
      percentage: result.percentage,
      date: result.date || new Date(),
      answers: answers
      // If you want to associate with user, you might need to get user info from auth token
      // userId: req.userId, 
      // userName: req.userName,
      // userEmail: req.userEmail
    });
    
    // Save to database
    const savedResult = await quizResult.save();
    
    // Send response
    res.json({
      message: 'Quiz results saved successfully',
      result: savedResult
    });
  } catch (error) {
    console.error('Error saving quiz results:', error);
    res.status(500).json({ 
      message: 'Error saving quiz results',
      error: error.message 
    });
  }
});

//
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user in the database
  studentsSchema.findOne({ email, password })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      else if(user.password===password){
        res.status(200).json({ message: 'Login successful', user });
      }
      else{
        res.status(401).json({ error: 'Invalid email or password' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/students', (req, res) => {
 studentsSchema.create(req.body)
  .then(student => res.status(201).json(student))
  .catch(err => res.status(400).json({ error: err.message }));
});
// Basic route for testing

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});