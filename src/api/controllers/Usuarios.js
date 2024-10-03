const Usuario = require('../models/Usuarios')

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find()
    return res.status(200).json(usuarios)
  } catch (error) {
    return res.status(400).json('Error en la solicitud de usuarios')
  }
}

const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params
    const usuario = await Usuario.findById(id)
    return res.status(200).json(usuario)
  } catch (error) {
    return res.status(400).json('Error en la solicitud por ID')
  }
}

const postUsuario = async (req, res) => {
  try {
    const newUsuario = new Usuario(req.body)
    const usuarioSaved = await newUsuario.save()
    return res.status(201).json(usuarioSaved)
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear el usuario', error })
  }
}

const putUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const usuarioUpdated = await Usuario.findByIdAndUpdate(id, req.body, {
      new: true
    })
    return res.status(200).json(usuarioUpdated)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al actualizar el usuario', error })
  }
}

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const usuarioDeleted = await Usuario.findByIdAndDelete(id)
    return res.status(200).json(usuarioDeleted)
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al eliminar el usuario', error })
  }
}

module.exports = {
  getUsuarios,
  getUsuarioById,
  postUsuario,
  putUsuario,
  deleteUsuario
}
