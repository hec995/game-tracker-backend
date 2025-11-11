const Review = require('../models/Review');
const Game = require('../models/Game');

// ➕ Crear una nueva reseña
exports.crearReseña = async (req, res) => {
  try {
    const { juegoId } = req.body;

    // Verificar que el juego exista
    const juego = await Game.findById(juegoId);
    if (!juego) {
      return res.status(404).json({ mensaje: 'El videojuego no existe' });
    }

    const nuevaReseña = new Review(req.body);
    await nuevaReseña.save();

    res.status(201).json({
      mensaje: '📝 Reseña creada exitosamente',
      data: nuevaReseña,
    });
  } catch (error) {
    console.error('Error al crear reseña:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// 📋 Obtener todas las reseñas (opcionalmente filtradas por juego)
exports.obtenerReseñas = async (req, res) => {
  try {
    const { juegoId } = req.query; // opcional: /api/reviews?juegoId=xxxx
    const filtro = juegoId ? { juegoId } : {};
    const reseñas = await Review.find(filtro)
      .populate('juegoId', 'titulo plataforma genero')
      .sort({ fechaCreacion: -1 });

    res.json(reseñas);
  } catch (error) {
    console.error('Error al obtener reseñas:', error.message);
    res.status(500).json({ error: 'Error al listar reseñas' });
  }
};

// 🔍 Obtener una reseña específica
exports.obtenerReseñaPorId = async (req, res) => {
  try {
    const reseña = await Review.findById(req.params.id).populate('juegoId');
    if (!reseña) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    res.json(reseña);
  } catch (error) {
    console.error('Error al obtener reseña:', error.message);
    res.status(400).json({ error: 'ID no válido o error en la búsqueda' });
  }
};

// ✏️ Actualizar una reseña
exports.actualizarReseña = async (req, res) => {
  try {
    const reseñaActualizada = await Review.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: Date.now() },
      { new: true, runValidators: true }
    );

    if (!reseñaActualizada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }

    res.json({
      mensaje: '✅ Reseña actualizada correctamente',
      data: reseñaActualizada,
    });
  } catch (error) {
    console.error('Error al actualizar reseña:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// ❌ Eliminar una reseña
exports.eliminarReseña = async (req, res) => {
  try {
    const reseñaEliminada = await Review.findByIdAndDelete(req.params.id);
    if (!reseñaEliminada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }

    res.json({
      mensaje: '🗑️ Reseña eliminada correctamente',
      data: reseñaEliminada,
    });
  } catch (error) {
    console.error('Error al eliminar reseña:', error.message);
    res.status(400).json({ error: 'Error al eliminar reseña' });
  }
};
