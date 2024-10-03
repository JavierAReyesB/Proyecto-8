const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      if (file.mimetype.startsWith('audio/')) {
        return 'reseñas' // Almacenar audios en la carpeta 'reseñas'
      } else {
        return 'libros' // Almacenar imágenes y PDFs en la carpeta 'libros'
      }
    },
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'mp3', 'wav'],
    resource_type: 'auto', // Agregar esta línea
    public_id: (req, file) =>
      `${file.fieldname}-${Date.now()}-${file.originalname.split('.')[0]}`
  }
})

const upload = multer({ storage })

module.exports = { upload, cloudinary }
