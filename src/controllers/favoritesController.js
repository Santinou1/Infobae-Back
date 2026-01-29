import User from '../models/User.js';

// Obtener todos los favoritos del usuario
export const getFavorites = async (req, res) => {
  try {
    let user = await User.findOne({ googleId: req.user.googleId });
    
    if (!user) {
      user = await User.create({
        googleId: req.user.googleId,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture,
        favorites: []
      });
    }

    res.json({
      success: true,
      favorites: user.favorites
    });
  } catch (error) {
    console.error('Error obteniendo favoritos:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error obteniendo favoritos' 
    });
  }
};

// Agregar un post a favoritos
export const addFavorite = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ 
        success: false, 
        error: 'postId es requerido' 
      });
    }

    let user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      user = await User.create({
        googleId: req.user.googleId,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture,
        favorites: []
      });
    }

    // Verificar si ya existe en favoritos
    const exists = user.favorites.some(fav => fav.postId === postId);
    
    if (exists) {
      return res.status(400).json({ 
        success: false, 
        error: 'El post ya está en favoritos' 
      });
    }

    user.favorites.push({ postId });
    await user.save();

    res.json({
      success: true,
      message: 'Post agregado a favoritos',
      favorites: user.favorites
    });
  } catch (error) {
    console.error('Error agregando favorito:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error agregando favorito' 
    });
  }
};

// Eliminar un post de favoritos
export const removeFavorite = async (req, res) => {
  try {
    const { postId } = req.params;

    const user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'Usuario no encontrado' 
      });
    }

    user.favorites = user.favorites.filter(fav => fav.postId !== postId);
    await user.save();

    res.json({
      success: true,
      message: 'Post eliminado de favoritos',
      favorites: user.favorites
    });
  } catch (error) {
    console.error('Error eliminando favorito:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error eliminando favorito' 
    });
  }
};

// Verificar si un post está en favoritos
export const checkFavorite = async (req, res) => {
  try {
    const { postId } = req.params;

    const user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      return res.json({ 
        success: true, 
        isFavorite: false 
      });
    }

    const isFavorite = user.favorites.some(fav => fav.postId === postId);

    res.json({
      success: true,
      isFavorite
    });
  } catch (error) {
    console.error('Error verificando favorito:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error verificando favorito' 
    });
  }
};
