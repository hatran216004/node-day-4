const express = require('express');
const { postController } = require('@/controllers');

const router = express.Router();

router.get('/', postController.getAll);

module.exports = router;
