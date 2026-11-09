const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const { JWT_SECRET_KEY } = require('../utils/config');
const { CREATED_STATUS, USER_NOT_FOUND_MESSAGE } = require('../utils/constants');

const createUserNotFoundError = () => new NotFoundError(USER_NOT_FOUND_MESSAGE);

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

const getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .orFail(createUserNotFoundError)
  .then((user) => res.send(user))
  .catch(next);

const getUserById = (req, res, next) => User.findById(req.params.userId)
  .orFail(createUserNotFoundError)
  .then((user) => res.send(user))
  .catch(next);

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(CREATED_STATUS).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(next);
};

const updateCurrentUser = (userId, fields) => User.findById(userId)
  .orFail(createUserNotFoundError)
  .then((user) => {
    Object.assign(user, fields);

    return user.save();
  });

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  return updateCurrentUser(req.user._id, { name, about })
    .then((user) => res.send(user))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return updateCurrentUser(req.user._id, { avatar })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  login,
  updateProfile,
  updateAvatar,
};
