const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  rater: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ratedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  comment: String
});

module.exports = mongoose.model('Rating', ratingSchema);