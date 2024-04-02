const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Define routes
app.use('/api/users', require('./routes/api/userRoutes'));
app.use('/api/thoughts', require('./routes/api/thoughtRoutes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
