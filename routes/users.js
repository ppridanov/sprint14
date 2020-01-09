const router = require('express').Router();
const User = require('../models/user');

const {
  createUser,
  getAllUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  login,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
router.post('/signup', createUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);
router.post('/signin', login)

module.exports = router;
