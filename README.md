# social-networking-by-Anna


## Description

The Social Networking API is a RESTful API built with Express.js and MongoDB, designed to power a social networking web application. It allows users to share their thoughts, react to friends' thoughts, and manage their friend list. This API is ideal for handling large amounts of unstructured data typical in social network platforms.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/social-networking-api.git
2. cd social-networking-api
npm install
3. npm run seed
## Usage
1. start the server:npm start
2. Use your favorite API testing tool (e.g., Insomnia or Postman) to interact with the API endpoints.
3. Refer to the API Routes section for available routes and their usage.

## API Routes
Users

GET /api/users: Get all users
GET /api/users/:id: Get a single user by ID
POST /api/users: Create a new user
PUT /api/users/:id: Update a user by ID
DELETE /api/users/:id: Delete a user by ID
POST /api/users/:userId/friends/:friendId: Add a friend to a user's friend list
DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user's friend list
Thoughts

GET /api/thoughts: Get all thoughts
GET /api/thoughts/:id: Get a single thought by ID
POST /api/thoughts: Create a new thought
PUT /api/thoughts/:id: Update a thought by ID
DELETE /api/thoughts/:id: Delete a thought by ID
POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought
DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought
## Models
Models
User
username: String (Required, Unique, Trimmed)
email: String (Required, Unique, Valid Email)
thoughts: Array of IDs referencing Thought model
friends: Array of IDs referencing User model (Self-reference)
Thought
thoughtText: String (Required, Max 280 characters)
createdAt: Date (Default: Current timestamp)
username: String (Required)
reactions: Array of nested documents (reactionSchema)
Reaction
reactionId: ObjectId (Default: New ObjectId)
reactionBody: String (Required, Max 280 characters)
username: String (Required)
createdAt: Date (Default: Current timestamp)