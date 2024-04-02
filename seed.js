// seed.js

const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample users data
const usersData = [
  {
    username: 'Kitt',
    email: 'user1@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'Ron',
    email: 'user2@example.com',
    thoughts: [],
    friends: []
  }
  
];

// Sample thoughts data
const thoughtsData = [
  {
    thoughtText: 'You are the best',
    username: 'user1',
    reactions: []
  },
  {
    thoughtText: 'Lets make friends',
    username: 'user1',
    reactions: []
  },
  
];

// Function to seed users data
const seedUsers = async () => {
  try {
    await User.deleteMany(); // Clear existing users data
    const users = await User.create(usersData); // Insert sample users data
    console.log('Users seeded:', users);
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Function to seed thoughts data
const seedThoughts = async () => {
  try {
    await Thought.deleteMany(); // Clear existing thoughts data
    const thoughts = await Thought.create(thoughtsData); // Insert sample thoughts data
    console.log('Thoughts seeded:', thoughts);
  } catch (error) {
    console.error('Error seeding thoughts:', error);
  }
};

// Seed the database
const seedDatabase = async () => {
  await seedUsers();
  await seedThoughts();
  mongoose.disconnect(); // Disconnect from MongoDB
};

seedDatabase(); // Run the seeding process
