const { isCelebrateError } = require('celebrate');
const {
  BAD_REQUEST_MESSAGE,
  EMAIL_CONFLICT_MESSAGE,
  SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

const DUPLICATE_KEY_CODE = 11000;

const getErrorResponse = (err) => {
  if (
    isCelebrateError(err)
    || err.name === 'ValidationError'
    || err.name === 'CastError'
    || err.type === 'entity.parse.failed'
  ) {
    return { statusCode: 400, message: BAD_REQUEST_MESSAGE };
  }

  if (err.code === DUPLICATE_KEY_CODE) {
    return { statusCode: 409, message: EMAIL_CONFLICT_MESSAGE };
  }

  if (err.statusCode && err.statusCode !== 500) {
    return { statusCode: err.statusCode, message: err.message };
  }

  return { statusCode: 500, message: SERVER_ERROR_MESSAGE };
};

module.exports = (err, req, res, next) => {
  const { statusCode, message } = getErrorResponse(err);

  res.status(statusCode).send({ message });
};
