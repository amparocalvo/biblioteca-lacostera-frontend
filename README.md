# Biblioteca La Costera Frontend

Frontend en React y Vite para busquedas en catalogo, socios y prestamos de Biblioteca La Costera

## Arranque

```bash
npm install
cp .env.example .env
npm run dev
```

## Tecnologías

- React
- Vite
- React Router DOM
- CSS
- Lucide React

## Arquitectura

- `components`: contiene los elementos visiuales que se reutilizan  en las distintas partes de la aplicación.
- `context`: gestión de autenticacion y sesion.
- `hooks`: agrupa la logica reutilizable para cargar datos y calcular información del panel.
- `pages`: pantallas principales.
- `services`: comunicacion con la API(centraliza las peticiones del backend).
- `styles`: variables CSS y estilos globales de diseño.

## Variables

```env
VITE_API_URL=http://localhost:4000/api
```
## Funcionalidades

- Login de usuario.
- Dashboard con resumen de libros, socios y préstamos.
- Catálogo completo de libros.
- Buscador de libros por título o autor.
- Listado de socios.
- Historial de préstamos.
- Navegación protegida mediante sesión.
