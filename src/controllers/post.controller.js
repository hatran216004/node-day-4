const { DEFAULT_PAGE_SIZE } = require('@/config/constants');
const { postModel } = require('@/models');
const postService = require('@/services/post.service');

const getAll = async (req, res) => {
  const { page = 1, limit = DEFAULT_PAGE_SIZE, user_id } = req.query;
  const posts = await postService.pagination(+page, +limit, {
    user_id: +user_id
  });
  res.success(posts, 200);
};

const postController = { getAll };

module.exports = postController;
