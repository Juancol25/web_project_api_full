const { NODE_ENV, JWT_SECRET } = process.env;

// En producción la clave viene del archivo .env del servidor.
// En desarrollo se usa una clave local para poder ejecutar sin .env.
const JWT_SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key';

module.exports = { JWT_SECRET_KEY };
