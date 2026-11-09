# Frontend — Alrededor de los EE. UU.

Aplicación en React (Vite) con registro, inicio de sesión y rutas protegidas.

## Rutas

- `/signup`: registro.
- `/signin`: inicio de sesión.
- `/`: aplicación (solo para usuarios autorizados; si no hay sesión se redirige a `/signin`).

## Conexión con la API

La dirección de la API se define en `src/utils/config.js`:

- Desarrollo: `http://localhost:3001`.
- Producción: el subdominio `api.` del dominio desde el que se sirve la aplicación.
- Opcional: la variable `VITE_API_URL` reemplaza ambas.

## Ejecutar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```
