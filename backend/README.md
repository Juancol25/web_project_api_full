# Backend — Alrededor de los EE. UU.

API REST con Express, MongoDB y autenticación JWT.

## Rutas

| Método | Ruta | Protegida | Descripción |
|---|---|---|---|
| POST | `/signup` | No | Registra un usuario (`email`, `password`; `name`, `about` y `avatar` opcionales). |
| POST | `/signin` | No | Inicia sesión y devuelve `{ token }`. |
| GET | `/users` | Sí | Lista de usuarios. |
| GET | `/users/me` | Sí | Usuario actual. |
| GET | `/users/:userId` | Sí | Usuario por `_id`. |
| PATCH | `/users/me` | Sí | Actualiza el perfil propio. |
| PATCH | `/users/me/avatar` | Sí | Actualiza el avatar propio. |
| GET | `/cards` | Sí | Lista de tarjetas. |
| POST | `/cards` | Sí | Crea una tarjeta. |
| DELETE | `/cards/:cardId` | Sí | Elimina una tarjeta propia. |
| PUT | `/cards/:cardId/likes` | Sí | Da "me gusta". |
| DELETE | `/cards/:cardId/likes` | Sí | Quita el "me gusta". |

Las rutas protegidas requieren el encabezado `Authorization: Bearer <token>`.

## Errores

La respuesta de error contiene únicamente el campo `message`.

| Código | Cuándo |
|---|---|
| 400 | Datos inválidos |
| 401 | Credenciales incorrectas o token inválido/expirado |
| 403 | Sin encabezado de autorización, o intento de eliminar la tarjeta de otro usuario |
| 404 | Usuario, tarjeta o ruta inexistente |
| 409 | Correo electrónico ya registrado |
| 500 | Error del servidor |

## Ejecutar

```bash
npm install
npm run dev    # desarrollo, puerto 3001 (nodemon)
npm start      # producción, puerto 3000
npm run lint
```

Sin archivo `.env` el servidor funciona en modo desarrollo. En producción se necesita `NODE_ENV=production` y `JWT_SECRET` (ver `.env.example`).
