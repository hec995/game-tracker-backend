const Game = require('../models/Game');

// Crear nuevo juego
exports.crearJuego = async (req, res) => {
  try {
    const nuevoJuego = await Game.create({
      ...req.body,
      usuario: req.user._id 
    });
    res.status(201).json(nuevoJuego);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear juego' });
  }
};

// Obtener juegos del usuario actual
exports.obtenerJuegos = async (req, res) => {
  try {
    const juegos = await Game.find({ usuario: req.user._id });
    res.json(juegos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener juegos' });
  }
};

// Obtener, actualizar, eliminar 
exports.obtenerJuegoPorId = async (req, res) => {
  try {
    const juego = await Game.findById(req.params.id);
    if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });
    res.json(juego);
  } catch {
    res.status(500).json({ error: 'Error al obtener juego' });
  }
};

exports.actualizarJuego = async (req, res) => {
  try {
    const juego = await Game.findById(req.params.id);
    if (!juego) return res.status(404).json({ error: 'No encontrado' });

    if (juego.usuario.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    const actualizado = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(actualizado);
  } catch {
    res.status(500).json({ error: 'Error al actualizar juego' });
  }
};

exports.eliminarJuego = async (req, res) => {
  try {
    const juego = await Game.findById(req.params.id);
    if (!juego) return res.status(404).json({ error: 'No encontrado' });

    if (juego.usuario.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    await juego.deleteOne();
    res.json({ mensaje: 'Juego eliminado' });
  } catch {
    res.status(500).json({ error: 'Error al eliminar juego' });
  }
};

//   FUNCIÓN PARA OBTENER TODOS LOS JUEGOS, MENOS LOS DEL USUARIO LOGUEADO
const explorarJuegos = async (req, res) => {
  try {
    const usuarioId = req.user._id;

    const juegos = await Game.find({
      usuario: { $ne: usuarioId } //  Excluir juegos del usuario actual
    }).populate("usuario", "nombre");

    res.json(juegos);
  } catch (err) {
    console.error("Error en explorarJuegos:", err);
    res.status(500).json({ error: "Error obteniendo juegos de otros usuarios" });
  }
};

exports.explorarJuegos = explorarJuegos;