# InfoPosts Backend API

**Prueba Técnica - Backend para Sistema de Favoritos**  
**Autor:** Santino Ursino | **Fecha:** 29/01/2026

## Descripción

Backend para gestión de favoritos de la aplicación InfoPosts. Implementa autenticación con Google OAuth 2.0 y persistencia en MongoDB Atlas.

## Características

- Autenticación con Google OAuth 2.0
- CRUD de favoritos por usuario
- Persistencia en MongoDB Atlas
- API RESTful con Express
- Configuración CORS

## Tecnologías

Node.js 18, Express 4, MongoDB Atlas, Mongoose 8, Google Auth Library, CORS, dotenv

## Instalación

```bash
npm install

# Configurar .env
PORT=3454
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?appName=Infoabe
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

npm run dev
```

## Endpoints

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/` | Info del API | No |
| GET | `/api/favorites` | Obtener favoritos | Sí |
| POST | `/api/favorites` | Agregar favorito | Sí |
| DELETE | `/api/favorites/:postId` | Eliminar favorito | Sí |
| GET | `/api/favorites/check/:postId` | Verificar favorito | Sí |

## Autenticación

Todas las rutas de favoritos requieren token de Google OAuth 2.0:

```
Authorization: Bearer {GOOGLE_ID_TOKEN}
```

## Modelo de Datos

```javascript
User {
  googleId: String,
  email: String,
  name: String,
  picture: String,
  favorites: [{
    postId: String,
    addedAt: Date
  }]
}
```

## Configuración CORS

Orígenes permitidos:
- `http://localhost:5173`
- `https://santinou1.github.io`
- `https://infobae-back.onrender.com`
- Dominios Vercel y Netlify

## Estructura

```
src/
├── config/database.js
├── models/User.js
├── middleware/auth.js
├── controllers/favoritesController.js
├── routes/favorites.js
└── server.js
```

## Despliegue

Plataforma: Render  
Base de datos: MongoDB Atlas

## Repositorio

https://github.com/Santinou1/InfoBae-Back


