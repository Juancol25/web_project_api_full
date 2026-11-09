const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/unauthorized-error');
const {
  URL_REGEX,
  DEFAULT_NAME,
  DEFAULT_ABOUT,
  DEFAULT_AVATAR,
  INCORRECT_CREDENTIALS_MESSAGE,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_NAME,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_ABOUT,
  },
  avatar: {
    type: String,
    default: DEFAULT_AVATAR,
    validate: {
      validator: (value) => URL_REGEX.test(value),
      message: 'Invalid avatar URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(INCORRECT_CREDENTIALS_MESSAGE));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError(INCORRECT_CREDENTIALS_MESSAGE));
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
