const CREATED_STATUS = 201;

const BAD_REQUEST_MESSAGE = 'Invalid data passed to the method';
const INCORRECT_CREDENTIALS_MESSAGE = 'Incorrect email or password';
const AUTHORIZATION_REQUIRED_MESSAGE = 'Authorization required';
const INVALID_TOKEN_MESSAGE = 'Invalid or expired token';
const FORBIDDEN_CARD_MESSAGE = 'You can only delete your own cards';
const USER_NOT_FOUND_MESSAGE = 'User ID not found';
const CARD_NOT_FOUND_MESSAGE = 'Card ID not found';
const ROUTE_NOT_FOUND_MESSAGE = 'Requested resource not found';
const EMAIL_CONFLICT_MESSAGE = 'A user with this email already exists';
const SERVER_ERROR_MESSAGE = 'An error has occurred on the server';

const DEFAULT_NAME = 'Jacques Cousteau';
const DEFAULT_ABOUT = 'Explorador';
const DEFAULT_AVATAR = 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg';

const URL_REGEX = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(:\d+)?(\/[\w\-.~:/?%#[\]@!$&'()*+,;=]*)?$/;

module.exports = {
  CREATED_STATUS,
  BAD_REQUEST_MESSAGE,
  INCORRECT_CREDENTIALS_MESSAGE,
  AUTHORIZATION_REQUIRED_MESSAGE,
  INVALID_TOKEN_MESSAGE,
  FORBIDDEN_CARD_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  ROUTE_NOT_FOUND_MESSAGE,
  EMAIL_CONFLICT_MESSAGE,
  SERVER_ERROR_MESSAGE,
  DEFAULT_NAME,
  DEFAULT_ABOUT,
  DEFAULT_AVATAR,
  URL_REGEX,
};
