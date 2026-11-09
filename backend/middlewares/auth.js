const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbidden-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_SECRET_KEY } = require('../utils/config');
const {
  AUTHORIZATION_REQUIRED_MESSAGE,
  INVALID_TOKEN_MESSAGE,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ForbiddenError(AUTHORIZATION_REQUIRED_MESSAGE));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError(INVALID_TOKEN_MESSAGE));
  }

  req.user = payload;

  return next();
};
