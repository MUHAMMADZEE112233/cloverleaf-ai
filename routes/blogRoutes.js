const express = require('express');

const {
  getPost,
  getPosts,
  createPost,
  deletePost,
  updatePost,
  likePost,
} = require('../controllers/blogController');

const router = express.Router();

router.route('/').get(getPosts).post(createPost);
router.route('/:id').get(getPost).delete(deletePost).patch(updatePost);
router.route('/:id/likePost').patch(likePost);

module.exports = router;
