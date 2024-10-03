const jwt = require('jsonwebtoken')

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Acceso denegado. Token no proporcionado.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' })
  }
}

// Middleware para verificar si el usuario es admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Acceso denegado. No tienes permisos de administrador.'
    })
  }
  next()
}

module.exports = { verifyToken, isAdmin }
