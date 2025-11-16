const Review = require("../models/Review");

//  Crear reseña
const crearReseña = async (req, res) => {
  try {
    const review = new Review({
      juegoId: req.body.juegoId,
      puntuacion: req.body.puntuacion,
      textoReseña: req.body.textoReseña,
      horasJugadas: req.body.horasJugadas,
      dificultad: req.body.dificultad,
      recomendaria: req.body.recomendaria,
      usuario: req.user._id,  
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener TODAS las reseñas de un juego 
const obtenerReseñasPorJuego = async (req, res) => {
  try {
    const juegoId = req.params.juegoId;

    const reseñas = await Review.find({ juegoId })
      .populate("usuario", "nombre email")  // Muestra info del usuario que escribió la reseña
      .sort({ fechaCreacion: -1 });

    res.json(reseñas);
  } catch (err) {
    console.error("Error obteniendo reseñas:", err);
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
};
//  Actualizar reseña 
const actualizarReseña = async (req, res) => {
  try {
    const reseña = await Review.findById(req.params.id);

    if (!reseña) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

   
    if (reseña.usuario.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "No puedes editar esta reseña" });
    }

    //  Actualizar campos
    reseña.puntuacion = req.body.puntuacion ?? reseña.puntuacion;
    reseña.textoReseña = req.body.textoReseña ?? reseña.textoReseña;
    reseña.horasJugadas = req.body.horasJugadas ?? reseña.horasJugadas;
    reseña.dificultad = req.body.dificultad ?? reseña.dificultad;
    reseña.recomendaria = req.body.recomendaria ?? reseña.recomendaria;
    reseña.fechaActualizacion = new Date();

    await reseña.save();

    res.json(reseña);
  } catch (err) {
    console.error("Error actualizando reseña:", err);
    res.status(500).json({ error: "Error al actualizar reseña" });
  }
};
//  Eliminar reseña 
const eliminarReseña = async (req, res) => {
  try {
    const reseña = await Review.findById(req.params.id);

    if (!reseña) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    if (reseña.usuario.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "No puedes eliminar esta reseña" });
    }

    await reseña.deleteOne();

    res.json({ message: "Reseña eliminada correctamente" });
  } catch (err) {
    console.error("Error eliminando reseña:", err);
    res.status(500).json({ error: "Error al eliminar reseña" });
  }
};
// Obtener reseñas del usuario logueado
const obtenerReseñasDeUsuario = async (req, res) => {
  try {
    const reseñas = await Review.find({ usuario: req.user._id })
      .populate("juegoId", "titulo imagenPortada")
      .sort({ fechaCreacion: -1 });

    res.json(reseñas);
  } catch (err) {
    console.error("Error obteniendo reseñas del usuario:", err);
    res.status(500).json({ error: "Error al obtener tus reseñas" });
  }
};
module.exports = {
  crearReseña,
  obtenerReseñasPorJuego,
  actualizarReseña,
  eliminarReseña,
  obtenerReseñasDeUsuario,
};

