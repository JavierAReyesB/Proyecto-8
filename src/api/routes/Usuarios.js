const {
  getUsuarios,
  getUsuarioById,
  postUsuario,
  putUsuario,
  deleteUsuario
} = require('../controllers/usuarios')

const { verifyToken, isAdmin } = require('../../middlewares/authMiddlewares')

const usuariosRouter = require('express').Router()

usuariosRouter.get('/:id', verifyToken, getUsuarioById)
usuariosRouter.get('/', verifyToken, isAdmin, getUsuarios)
usuariosRouter.post('/', postUsuario)
usuariosRouter.put('/:id', verifyToken, putUsuario)
usuariosRouter.delete('/:id', verifyToken, deleteUsuario)

module.exports = usuariosRouter
