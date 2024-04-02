// controllers/userController.js
const User = require('../models/User');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (!user.friends.includes(req.params.friendId)) {
        user.friends.push(req.params.friendId);
        await user.save();
      }
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.friends = user.friends.filter(friendId => friendId.toString() !== req.params.friendId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = userController;
