const express = require('express');
const { followUser } = require('../controllers/userController');
const router = express.Router();

router.post('/:userId/follow', followUser);

module.exports = router;
