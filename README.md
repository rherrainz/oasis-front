# OasisJS Blogger Frontend

Frontend React para OasisJS Blogger. Consume una API Express separada y no guarda claves administrativas en el navegador.

## Datos del proyecto

- Autor: Rodrigo Herrainz
- Universidad / Facultad: Universidad Kennedy
- Materia: Sistemas Multiplataformas
- Sistema: OasisJS Blogger
- Repositorio frontend: `https://github.com/rherrainz/oasis-front.git`
- Repositorio backend: `https://github.com/rherrainz/oasis-back.git`

Consultar también el repositorio backend para ver la API REST, autenticación JWT, modelo de datos, subida de imágenes y configuración de Railway.

## Tecnologías usadas

- Lenguaje: JavaScript
- Librería UI: React
- Build tool: Vite
- Routing: React Router
- Estilos: Tailwind CSS
- Consumo de API: Fetch API
- Persistencia de sesión admin: `localStorage`
- Variables de entorno: `VITE_API_URL`
- Gestor de paquetes: npm
- Hosting frontend: Vercel
- Configuración de deploy: `vercel.json`
- Backend consumido: Node.js + Express + PostgreSQL + Prisma

## Instalación local

```bash
npm install
cp .env.example .env
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Variables de entorno

```env
VITE_API_URL=http://localhost:3000/api
```

Solo se usa `VITE_API_URL`. No se debe crear `VITE_ADMIN_KEY`, porque toda variable con prefijo `VITE_` queda expuesta en el navegador.

## Rutas

- `/`: bienvenida.
- `/blog`: listado público de posts publicados.
- `/blog/:slug`: detalle público de un post publicado.
- `/about`: información del proyecto.
- `/admin/login`: login administrativo.
- `/admin`: panel administrativo protegido.
- `/admin/posts/new`: crear post.
- `/admin/posts/:id/edit`: editar post.

## Flujo de administración

1. Ingresar a `/admin/login`.
2. Autenticarse con `ADMIN_KEY` o con usuario y contraseña.
3. El backend devuelve un JWT.
4. El frontend guarda el JWT en `localStorage`.
5. Las peticiones administrativas envían `Authorization: Bearer TOKEN`.

## Deploy en Vercel

1. Crear un proyecto en Vercel apuntando a este repositorio frontend.
2. Configurar `VITE_API_URL` con la URL pública del backend en Railway, por ejemplo:

```env
VITE_API_URL=https://tu-api.railway.app/api
```

3. Vercel usa `vercel.json` para ejecutar `npm run build`, publicar `dist` y resolver rutas de React Router hacia `index.html`.

El backend debe tener `FRONTEND_URL` configurado con el dominio final de Vercel para que CORS permita las peticiones.
