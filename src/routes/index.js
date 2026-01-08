const express = require('express');

const tasksRoutes = require('./post.route');

const router = express.Router();

router.use('/posts', tasksRoutes);

module.exports = router;
