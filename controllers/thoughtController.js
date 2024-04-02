// controllers/thoughtController.js
const Thought = require('../models/Thought');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id).populate('reactions');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      res.status(201).json(newThought);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      thought.reactions.push(req.body);
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== req.params.reactionId);
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = thoughtController;
