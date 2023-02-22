const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, 'Title is Required'],
    },
    message: {
      type: String,
      require: [true, 'Message is Required'],
    },
    creator: {
      type: String,
      require: [true, 'Creator is Required'],
    },
    tags: [String],
    selectedFile: String,
    likeCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
