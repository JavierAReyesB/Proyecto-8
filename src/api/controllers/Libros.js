const Libro = require('../models/Libros')
const { cloudinary } = require('../../config/cloudinary')

const getLibros = async (req, res) => {
  try {
    const libros = await Libro.find()
    return res.status(200).json(libros)
  } catch (error) {
    console.error('Error en la solicitud de libros:', error)
    return res.status(400).json({
      message: 'Error en la solicitud de libros',
      error: error.message
    })
  }
}

const getLibroById = async (req, res) => {
  try {
    const { id } = req.params
    const libro = await Libro.findById(id)
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' })
    }
    return res.status(200).json(libro)
  } catch (error) {
    console.error('Error en la solicitud por ID:', error)
    return res
      .status(400)
      .json({ message: 'Error en la solicitud por ID', error: error.message })
  }
}

const getLibrosByCategory = async (req, res) => {
  try {
    const { category } = req.params
    const libros = await Libro.find({ category })
    return res.status(200).json(libros)
  } catch (error) {
    console.error('Error en la solicitud por categoría:', error)
    return res.status(400).json({
      message: 'Error en la solicitud por categoría',
      error: error.message
    })
  }
}

const postLibro = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Por favor, sube un archivo.' })
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'libros',
      resource_type: req.file.mimetype === 'application/pdf' ? 'raw' : 'image'
    })

    const newLibro = new Libro({
      ...req.body,
      image: result.secure_url,
      createdBy: req.user.id
    })

    const libroSaved = await newLibro.save()
    return res.status(201).json(libroSaved)
  } catch (error) {
    console.error('Error al crear el libro:', error)
    return res.status(500).json({
      message: 'Error al crear el libro',
      error: error.message || error.toString(),
      stack: error.stack || 'No stack available'
    })
  }
}

const putLibro = async (req, res) => {
  try {
    const { id } = req.params
    let updateData = { ...req.body }
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'libros',
        resource_type: req.file.mimetype === 'application/pdf' ? 'raw' : 'image'
      })
      updateData.image = result.secure_url
    }

    const libroUpdated = await Libro.findByIdAndUpdate(id, updateData, {
      new: true
    })
    return res.status(200).json(libroUpdated)
  } catch (error) {
    console.error('Error al actualizar el libro:', error)
    return res
      .status(400)
      .json({ message: 'Error al actualizar el libro', error: error.message })
  }
}

const deleteLibro = async (req, res) => {
  try {
    const { id } = req.params
    const libro = await Libro.findById(id)
    if (libro && libro.image) {
      const public_id = libro.image.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(`libros/${public_id}`)
    }

    const libroDeleted = await Libro.findByIdAndDelete(id)
    if (!libroDeleted) {
      return res.status(404).json({ message: 'Libro no encontrado' })
    }
    return res.status(200).json(libroDeleted)
  } catch (error) {
    console.error('Error al eliminar el libro:', error)
    return res
      .status(400)
      .json({ message: 'Error al eliminar el libro', error: error.message })
  }
}

module.exports = {
  getLibros,
  getLibroById,
  getLibrosByCategory,
  postLibro,
  putLibro,
  deleteLibro
}
