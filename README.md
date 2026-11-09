# Alrededor de los EE. UU. — Full Stack

## Descripción del proyecto

Aplicación web completa "Alrededor de los EE. UU.": un frontend en React y una API propia en Node.js/Express con base de datos MongoDB, desplegados en un servidor remoto. Los usuarios pueden registrarse, iniciar sesión, editar su perfil y avatar, agregar y eliminar sus tarjetas, y dar o quitar "me gusta".

## Funcionalidad

- Registro e inicio de sesión de usuarios con autenticación mediante **JWT** (válido por 7 días).
- Contraseñas almacenadas como hash (**bcryptjs**); la API nunca devuelve el hash.
- Todas las rutas de la API están protegidas, excepto `/signin` y `/signup`.
- Un usuario solo puede editar su propio perfil y avatar, y solo puede eliminar las tarjetas que creó.
- Validación de los datos de entrada antes de llegar a los controladores.
- Manejo centralizado de errores con los códigos 400, 401, 403, 404, 409 y 500.
- Registro de todas las solicitudes (`request.log`) y de todos los errores (`error.log`) en formato JSON.
- El servidor se reinicia automáticamente si se cae (PM2).

## Tecnologías y técnicas utilizadas

**Frontend (`frontend/`)**
- React 19, Vite y React Router.
- Context API para el usuario actual y `localStorage` para conservar el JWT.
- Rutas protegidas, ventana informativa de registro y diseño adaptable.

**Backend (`backend/`)**
- Node.js, Express y Mongoose (MongoDB).
- `bcryptjs` y `jsonwebtoken` para la autenticación; `validator` para validar correos y enlaces.
- `celebrate` y `Joi` para validar solicitudes; `winston` y `express-winston` para los registros.
- `cors`, `dotenv` y ESLint con la guía de estilo Airbnb.

**Despliegue**
- Servidor en la nube con Nginx como proxy inverso, certificados HTTPS (Let's Encrypt) y PM2 para mantener el proceso activo.

## Estructura del repositorio

```
backend/    API (Express + MongoDB)
frontend/   Aplicación (React + Vite)
README.md
```

## Cómo ejecutarlo en local

Requiere Node.js y MongoDB corriendo en `mongodb://localhost:27017`.

```bash
# Backend (puerto 3001 en desarrollo)
cd backend
npm install
npm run dev

# Frontend (puerto 3000), en otra terminal
cd frontend
npm install
npm run dev
```

En producción, el backend usa las variables `NODE_ENV=production` y `JWT_SECRET` definidas en un archivo `.env` que solo existe en el servidor (ver `backend/.env.example`).

## URL de la aplicación

- Aplicación: https://TU-DOMINIO
- API: https://api.TU-DOMINIO
