import express from 'express';
const router = express.Router();
import Magnet from '../models/magnetModel.js'

router.post('/test-save', async (req, res) => {
  try {
    const { name, magnetURI } = req.body;

    const nuevoMagnet = new Magnet({
      name: name,
      magnetURI: magnetURI,
    });

    const resultado = await nuevoMagnet.save();
    res.status(200).json({ mensaje: 'Guardado exitoso', data: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar', error });
  }
});

router.get('/test-get', async (req, res) => {
  try {
    const magnets = await Magnet.find();
    res.status(200).json({ mensaje: 'Recuperado exitosamente', data: magnets });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al recuperar', error });
  }
});

export default router;
