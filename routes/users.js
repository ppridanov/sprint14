const router = require('express').Router();
const auth = require('../middlewars/auth');
const User = require('../models/user');

const {
  createUser,
  getAllUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  login,
} = require('../controllers/users');

router.get('/users', auth, getAllUsers);
router.get('/users/:userId', auth, getUser);
router.post('/signup', createUser);
router.patch('/users/me', auth, updateUserInfo);
router.patch('/users/me/avatar', auth, updateUserAvatar);
router.post('/signin', login)

module.exports = router;
