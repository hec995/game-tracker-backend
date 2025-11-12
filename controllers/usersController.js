const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const nuevoUsuario = await User.create({ nombre, email, password });
    const token = generarToken(nuevoUsuario._id);

    res.status(201).json({
      _id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if (usuario && (await usuario.compararPassword(password))) {
      const token = generarToken(usuario._id);
      res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        token,
      });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
