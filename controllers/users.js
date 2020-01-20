const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.createUser = (req, res) => {
  console.log(req.body.password.length);
  if (req.body.password.length < 8) {
    return res.status(400).send({ message: 'Пароль должен содержать не менее 8 символов' });
  }
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then(() => res.status(201).send({ message: 'Пользователь создан' }))
    .catch((err) => res.status(400).send(err.message));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const JWT_SECRET = 'f86fa1ca3730b0a770c44debf1cea55ae915f2bd9809cb5ae1239a1f6fc80314';
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })
        .send(token)
        .end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send(err.message));
};

module.exports.getUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(err.message));
};

module.exports.updateUserInfo = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findById(userId)
    .then((user) => {
      if (user.id.toString() === userId) {
        User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
          .then((user) => res.send({ data: user }))
          .catch((err) => res.status(500).send(err.message));
      } else {
        return Promise.reject(new Error('У вас нет доступа к изменению чужих аккаунтов'));
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findById(userId)
    .then((user) => {
      if (user.id.toSting() === userId) {
        User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
          .then((user) => res.send({ data: user }))
          .catch((err) => res.status(500).send(err.message));
      } else {
        return Promise.reject(new Error('У вас нет доступа к изменению чужих аккаунтов'));
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
