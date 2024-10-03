const Resena = require('../models/Resenas')
const Libro = require('../models/Libros') // Asegurarse de importar el modelo de Libro
const { cloudinary } = require('../../config/cloudinary')

const getResenas = async (req, res) => {
  try {
    const resenas = await Resena.find()
      .populate('user', 'username email')
      .populate('libro', 'name description')
    return res.status(200).json(resenas)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error en la solicitud de reseñas', error })
  }
}

const getResenaById = async (req, res) => {
  try {
    const { id } = req.params
    const resena = await Resena.findById(id)
      .populate('user', 'username email')
      .populate('libro', 'name description')
    return res.status(200).json(resena)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error en la solicitud por ID', error })
  }
}

const postResena = async (req, res) => {
  try {
    console.log('File received:', req.file) // Verificar si se recibe el archivo
    console.log('Body:', req.body)

    const { content, libro } = req.body
    const user = req.user.id
    let audioUrl = null

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto', // Cambiado a auto para más flexibilidad
        folder: 'reseñas'
      })
      audioUrl = result.secure_url
    }

    const newResena = new Resena({
      content,
      user,
      libro,
      audio: audioUrl
    })

    const resenaSaved = await newResena.save()

    // Actualizar el libro con la nueva reseña
    await Libro.findByIdAndUpdate(libro, {
      $push: { reviews: resenaSaved._id }
    })

    return res.status(201).json(resenaSaved)
  } catch (error) {
    console.error('Error al crear la reseña:', error) // Detallar el error
    return res.status(400).json({ message: 'Error al crear la reseña', error })
  }
}

const putResena = async (req, res) => {
  try {
    const { id } = req.params
    const resenaUpdated = await Resena.findByIdAndUpdate(id, req.body, {
      new: true
    })
    return res.status(200).json(resenaUpdated)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al actualizar la reseña', error })
  }
}

const deleteResena = async (req, res) => {
  try {
    const { id } = req.params
    const resenaDeleted = await Resena.findByIdAndDelete(id)

    // Eliminar la reseña del libro
    await Libro.findByIdAndUpdate(resenaDeleted.libro, {
      $pull: { reviews: id }
    })

    return res.status(200).json(resenaDeleted)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al eliminar la reseña', error })
  }
}

module.exports = {
  getResenas,
  getResenaById,
  postResena,
  putResena,
  deleteResena
}
