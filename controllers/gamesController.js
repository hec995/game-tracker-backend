const Game = require('../models/Game');

// ➕ Crear un nuevo juego
exports.crearJuego = async (req, res) => {
  try {
    const nuevoJuego = new Game(req.body);
    await nuevoJuego.save();
    res.status(201).json({
      mensaje: '🎮 Juego creado exitosamente',
      data: nuevoJuego,
    });
  } catch (error) {
    console.error('Error al crear juego:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// 📋 Obtener todos los juegos
exports.obtenerJuegos = async (req, res) => {
  try {
    const juegos = await Game.find().sort({ fechaCreacion: -1 });
    res.json(juegos);
  } catch (error) {
    console.error('Error al listar juegos:', error.message);
    res.status(500).json({ error: 'Error al obtener los juegos' });
  }
};

// 🔍 Obtener un solo juego por ID
exports.obtenerJuegoPorId = async (req, res) => {
  try {
    const juego = await Game.findById(req.params.id);
    if (!juego) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    res.json(juego);
  } catch (error) {
    console.error('Error al obtener juego:', error.message);
    res.status(400).json({ error: 'ID no válido o error en la búsqueda' });
  }
};

// ✏️ Actualizar un juego
exports.actualizarJuego = async (req, res) => {
  try {
    const juegoActualizado = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!juegoActualizado) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }

    res.json({
      mensaje: '✅ Juego actualizado correctamente',
      data: juegoActualizado,
    });
  } catch (error) {
    console.error('Error al actualizar juego:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// ❌ Eliminar un juego
exports.eliminarJuego = async (req, res) => {
  try {
    const juegoEliminado = await Game.findByIdAndDelete(req.params.id);
    if (!juegoEliminado) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }

    res.json({
      mensaje: '🗑️ Juego eliminado correctamente',
      data: juegoEliminado,
    });
  } catch (error) {
    console.error('Error al eliminar juego:', error.message);
    res.status(400).json({ error: 'Error al eliminar el juego' });
  }
};
