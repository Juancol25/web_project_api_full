const LOCAL_API_URL = "http://localhost:3001";

// En desarrollo la API corre en localhost:3001. En producción se usa el
// subdominio "api." del mismo dominio desde el que se sirve el frontend.
export default function getApiBaseUrl() {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (import.meta.env.DEV) {
    return LOCAL_API_URL;
  }

  const { protocol, hostname } = window.location;

  return `${protocol}//api.${hostname.replace(/^www\./, "")}`;
}
