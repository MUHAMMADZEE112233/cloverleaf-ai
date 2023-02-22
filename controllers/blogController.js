const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

const PostMessage = require('../models/post');

// const getPosts = async (req, res) => {
//   try {
//     const posts = await PostMessage.find({});
//     res.status(StatusCodes.OK).json(posts);
//   } catch (error) {
//     res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
//   }
// };

// const getPost = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await PostMessage.find({ _id: id });
//     res.status(StatusCodes.OK).json(post);
//   } catch (error) {
//     res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
//   }
// };

// const createPost = async (req, res) => {
//   const { title, message, selectedFile, creator, tags } = req.body;

//   if (!title || !message || !selectedFile || !creator || !tags) {
//     res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: 'Please Provide all values' });
//   }

//   const newPost = new PostMessage({
//     title,
//     message,
//     selectedFile,
//     creator,
//     tags,
//   });

//   try {
//     await newPost.save();
//     res.status(StatusCodes.CREATED).json(newPost);
//   } catch (error) {
//     console.log(error);
//     res.status(StatusCodes.EXPECTATION_FAILED).json({ message: error.message });
//   }
// };

// const updatePost = async (req, res) => {
//   const { id } = req.params;

//   const { title, message, creator, selectedFile, tags } = req.body;

//   if (!title || !message || !selectedFile || !creator || !tags) {
//     res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ message: 'Please Provide all values' });
//   }

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(StatusCodes.NOT_FOUND).send(`No post with this ID`);
//   }

//   const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

//   await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//   res.status(StatusCodes.OK).json(updatedPost);
// };

// const deletePost = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(StatusCodes.NOT_FOUND).send(`No post with this ID`);
//   }

//   await PostMessage.findByIdAndDelete(id);

//   res.status(StatusCodes.OK).json({ messge: 'Post deleted Successfully.' });
// };

// const likePost = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(StatusCodes.NOT_FOUND).send(`No post with this ID`);
//   }
//   const post = await PostMessage.find({ _id: id });
//   const updatedPost = await PostMessage.findByIdAndUpdate(
//     id,
//     { likeCount: post.likeCount + 1 },
//     { new: true }
//   );

//   res.status(StatusCodes.OK).json(updatedPost);
// };

const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPostMessage = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully.' });
};

const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};

module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
