import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import favoritesRoutes from './routes/favorites.js';

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://infobae-back.onrender.com',
    'https://santinou1.github.io',
    /\.vercel\.app$/,
    /\.netlify\.app$/
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 InfoPosts API - Backend funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      favorites: '/api/favorites'
    }
  });
});

app.use('/api/favorites', favoritesRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
