const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuarios')

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const existingUser = await Usuario.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new Usuario({
      username,
      email,
      password: hashedPassword,
      role: 'user'
    })

    await newUser.save()
    res.status(201).json({ message: 'Usuario registrado exitosamente.' })
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro de usuario.', error })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await Usuario.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.status(200).json({ message: 'Inicio de sesión exitoso.', token })
  } catch (error) {
    res.status(500).json({ message: 'Error en el inicio de sesión.', error })
  }
}

module.exports = { register, login }
