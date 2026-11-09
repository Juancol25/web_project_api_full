require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateSignup, validateLogin } = require('./middlewares/validation');
const NotFoundError = require('./errors/not-found-error');
const { ROUTE_NOT_FOUND_MESSAGE } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb')
  .catch((err) => console.error('MongoDB connection error:', err.message));

app.use(requestLogger);
app.use(cors());
app.options('*', cors());
app.use(express.json());

// Ruta temporal para la prueba de caída del servidor. Eliminar tras la revisión.
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateSignup, createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use((req, res, next) => next(new NotFoundError(ROUTE_NOT_FOUND_MESSAGE)));

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
