import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite
} from '../controllers/favoritesController.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verifyToken);

// GET /api/favorites - Obtener todos los favoritos
router.get('/', getFavorites);

// POST /api/favorites - Agregar a favoritos
router.post('/', addFavorite);

// DELETE /api/favorites/:postId - Eliminar de favoritos
router.delete('/:postId', removeFavorite);

// GET /api/favorites/check/:postId - Verificar si está en favoritos
router.get('/check/:postId', checkFavorite);

export default router;
