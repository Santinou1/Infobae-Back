# 🚀 InfoPosts Backend API

Backend para la aplicación InfoPosts que maneja favoritos de noticias con autenticación de Google OAuth 2.0.

## 📋 Características

- ✅ Autenticación con Google OAuth 2.0
- ✅ Gestión de favoritos por usuario
- ✅ Persistencia en MongoDB
- ✅ API RESTful
- ✅ CORS habilitado

## 🛠️ Tecnologías

- Node.js
- Express
- MongoDB (Mongoose)
- Google Auth Library

## 📦 Instalación

```bash
npm install
```

## ⚙️ Configuración

El archivo `.env` ya está configurado con:

```
PORT=3000
MONGODB_URI=mongodb+srv://...
GOOGLE_CLIENT_ID=957318426574-...
```

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📡 Endpoints

### GET /
Información del API

### GET /api/favorites
Obtener todos los favoritos del usuario autenticado

**Headers:**
```
Authorization: Bearer {GOOGLE_TOKEN}
```

**Respuesta:**
```json
{
  "success": true,
  "favorites": [
    {
      "postId": "123",
      "addedAt": "2024-01-29T..."
    }
  ]
}
```

### POST /api/favorites
Agregar un post a favoritos

**Headers:**
```
Authorization: Bearer {GOOGLE_TOKEN}
```

**Body:**
```json
{
  "postId": "123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Post agregado a favoritos",
  "favorites": [...]
}
```

### DELETE /api/favorites/:postId
Eliminar un post de favoritos

**Headers:**
```
Authorization: Bearer {GOOGLE_TOKEN}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Post eliminado de favoritos",
  "favorites": [...]
}
```

### GET /api/favorites/check/:postId
Verificar si un post está en favoritos

**Headers:**
```
Authorization: Bearer {GOOGLE_TOKEN}
```

**Respuesta:**
```json
{
  "success": true,
  "isFavorite": true
}
```

## 🔐 Autenticación

Todas las rutas de favoritos requieren un token de Google OAuth 2.0 en el header:

```
Authorization: Bearer {GOOGLE_ID_TOKEN}
```

El token se obtiene desde el frontend después del login con Google.

## 📊 Modelo de Datos

### User
```javascript
{
  googleId: String,      // ID único de Google
  email: String,         // Email del usuario
  name: String,          // Nombre completo
  picture: String,       // URL de la foto de perfil
  favorites: [{
    postId: String,      // ID del post favorito
    addedAt: Date        // Fecha de agregado
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 Integración con Frontend

Desde el frontend de InfoPosts, puedes usar el API así:

```javascript
// Obtener favoritos
const response = await fetch('http://localhost:3000/api/favorites', {
  headers: {
    'Authorization': `Bearer ${googleToken}`
  }
});

// Agregar favorito
await fetch('http://localhost:3000/api/favorites', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${googleToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ postId: '123' })
});

// Eliminar favorito
await fetch(`http://localhost:3000/api/favorites/${postId}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${googleToken}`
  }
});
```

## 📝 Notas

- El servidor crea automáticamente el usuario en la base de datos al hacer la primera petición
- Los favoritos se guardan por usuario usando el Google ID
- El token de Google se verifica en cada petición para seguridad

---

**¡Backend listo para gestionar favoritos! 🎉**
