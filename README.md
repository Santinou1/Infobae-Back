# 🚀 InfoPosts Backend API

Backend para la aplicación InfoPosts que maneja favoritos de noticias con autenticación de Google OAuth 2.0.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## 📋 Características

- ✅ Autenticación con Google OAuth 2.0
- ✅ Gestión de favoritos por usuario
- ✅ Persistencia en MongoDB Atlas
- ✅ API RESTful
- ✅ CORS configurado
- ✅ Validación de tokens JWT

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Google Auth Library** - Verificación de tokens
- **CORS** - Manejo de peticiones cross-origin
- **dotenv** - Variables de entorno

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

## ⚙️ Configuración

Edita el archivo `.env`:

```env
PORT=3454
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?appName=Infoabe
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### Obtener MongoDB URI

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster
3. Crea un usuario de base de datos
4. Obtén la connection string
5. Reemplaza `<password>` con tu contraseña

### Obtener Google Client ID

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un proyecto
3. Habilita Google+ API
4. Crea credenciales OAuth 2.0
5. Copia el Client ID

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor estará disponible en `http://localhost:3454`

## 📡 Endpoints

### GET /
Información del API

**Respuesta:**
```json
{
  "message": "🚀 InfoPosts API - Backend funcionando correctamente",
  "version": "1.0.0",
  "endpoints": {
    "favorites": "/api/favorites"
  }
}
```

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

### Flujo de Autenticación

1. Usuario hace login con Google en el frontend
2. Google devuelve un token JWT
3. Frontend envía el token en cada petición
4. Backend verifica el token con Google
5. Si es válido, procesa la petición
6. Si no es válido, devuelve 401 Unauthorized

## 📊 Modelo de Datos

### User

```javascript
{
  googleId: String,      // ID único de Google (required, unique)
  email: String,         // Email del usuario (required, unique)
  name: String,          // Nombre completo (required)
  picture: String,       // URL de la foto de perfil
  favorites: [{
    postId: String,      // ID del post favorito (required)
    addedAt: Date        // Fecha de agregado (default: Date.now)
  }],
  createdAt: Date,       // Fecha de creación (auto)
  updatedAt: Date        // Fecha de actualización (auto)
}
```

## 🔧 Configuración CORS

El backend está configurado para aceptar peticiones desde:

- `http://localhost:5173` (desarrollo local)
- `http://localhost:3000` (desarrollo local alternativo)
- `https://infobae-back.onrender.com` (producción)
- Dominios de Netlify (`.netlify.app`)

Para agregar más dominios, edita `src/server.js`:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://tu-dominio.com',
    // Agrega más aquí
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
```

## 🧪 Testing

### Verificar que el servidor está corriendo

```bash
curl http://localhost:3454
```

### Probar endpoint de favoritos (requiere token)

```bash
curl -H "Authorization: Bearer YOUR_GOOGLE_TOKEN" \
  http://localhost:3454/api/favorites
```

### Obtener el token de Google

1. Inicia sesión en el frontend
2. Abre la consola del navegador (F12)
3. Ve a Application → Local Storage
4. Busca la key `googleToken`
5. Copia el valor

## 📁 Estructura del Proyecto

```
Infobae-Back/
├── src/
│   ├── config/
│   │   └── database.js          # Conexión a MongoDB
│   ├── models/
│   │   └── User.js              # Modelo de usuario
│   ├── middleware/
│   │   └── auth.js              # Verificación de tokens
│   ├── controllers/
│   │   └── favoritesController.js  # Lógica de favoritos
│   ├── routes/
│   │   └── favorites.js         # Rutas del API
│   └── server.js                # Servidor principal
├── .env                         # Variables de entorno
├── .env.example                 # Ejemplo de variables
├── .gitignore                   # Archivos ignorados
├── package.json                 # Dependencias
└── README.md                    # Este archivo
```

## 🐛 Solución de Problemas

### Error: MongoDB Connection

**Síntoma:**
```
Error conectando a MongoDB
```

**Solución:**
1. Verifica que `MONGODB_URI` esté correcta
2. Verifica que tu IP esté permitida en MongoDB Atlas
3. En MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

### Error: Token Inválido

**Síntoma:**
```
401 Unauthorized - Token inválido
```

**Solución:**
1. Verifica que `GOOGLE_CLIENT_ID` sea el mismo en frontend y backend
2. Asegúrate de que el token se esté enviando en el header `Authorization`
3. Verifica que el token no haya expirado

### Error: CORS

**Síntoma:**
```
Access to fetch has been blocked by CORS policy
```

**Solución:**
1. Verifica que el dominio del frontend esté en `corsOptions`
2. Asegúrate de que el backend esté corriendo
3. Verifica que la URL no tenga doble barra (`//api`)


## 🔄 Integración con Frontend

El frontend se conecta al backend usando el servicio `favoritesService.js`:

```javascript
// Ejemplo de uso desde el frontend
import favoritesService from './api/services/favoritesService';

// Obtener favoritos
const response = await favoritesService.getFavorites();

// Agregar favorito
await favoritesService.addFavorite('post123');

// Eliminar favorito
await favoritesService.removeFavorite('post123');
```

## 📝 Notas

- El servidor crea automáticamente el usuario en la base de datos al hacer la primera petición
- Los favoritos se guardan por usuario usando el Google ID
- El token de Google se verifica en cada petición para seguridad
- MongoDB Atlas tiene un plan gratuito con 512MB de almacenamiento

**¡Backend listo para gestionar favoritos! 🎉**
