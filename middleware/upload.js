const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    
    // Definir pasta baseada no tipo de upload
    switch (req.uploadType || req.body.uploadType) {
      case 'animals':
        uploadPath += 'animals/';
        break;
      case 'reports':
        uploadPath += 'reports/';
        break;
      case 'blog':
        uploadPath += 'blog/';
        break;
      case 'campaigns':
        uploadPath += 'campaigns/';
        break;
      case 'profiles':
        uploadPath += 'profiles/';
        break;
      default:
        uploadPath += 'general/';
    }
    
    // Criar pasta se não existir
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Gerar nome único para o arquivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtro de arquivos
const fileFilter = (req, file, cb) => {
  // Tipos de arquivo permitidos
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Apenas imagens são permitidas (JPEG, PNG, GIF, WebP)'));
  }
};

// Configuração do multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter
});

// Middleware para redimensionar imagens
const resizeImage = async (req, res, next) => {
  if (!req.files && !req.file) return next();

  try {
    const files = req.files || [req.file];
    const resizedFiles = [];

    for (const file of files) {
      if (file) {
        const resizedPath = file.path.replace(path.extname(file.path), '-resized' + path.extname(file.path));
        
        await sharp(file.path)
          .resize(800, 600, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ quality: 85 })
          .toFile(resizedPath);
        
        // Substituir arquivo original pelo redimensionado
        fs.unlinkSync(file.path);
        fs.renameSync(resizedPath, file.path);
        
        resizedFiles.push(file);
      }
    }

    if (req.files) {
      req.files = resizedFiles;
    } else {
      req.file = resizedFiles[0];
    }

    next();
  } catch (error) {
    console.error('Erro ao redimensionar imagem:', error);
    return res.status(500).json({ message: 'Erro ao processar imagem' });
  }
};

// Middleware para criar thumbnail
const createThumbnail = async (req, res, next) => {
  if (!req.files && !req.file) return next();

  try {
    const files = req.files || [req.file];

    for (const file of files) {
      if (file) {
        const thumbnailPath = file.path.replace(path.extname(file.path), '-thumb' + path.extname(file.path));
        
        await sharp(file.path)
          .resize(200, 200, {
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: 80 })
          .toFile(thumbnailPath);
      }
    }

    next();
  } catch (error) {
    console.error('Erro ao criar thumbnail:', error);
    // Não bloquear o processo se o thumbnail falhar
    next();
  }
};

// Middleware para limpar uploads em caso de erro
const cleanupOnError = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    if (res.statusCode >= 400 && (req.files || req.file)) {
      // Limpar arquivos enviados em caso de erro
      const files = req.files || [req.file];
      files.forEach(file => {
        if (file && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    return originalSend.call(this, data);
  };
  
  next();
};

// Middleware para definir tipo de upload
const setUploadType = (type) => {
  return (req, res, next) => {
    req.uploadType = type;
    next();
  };
};

module.exports = {
  upload,
  resizeImage,
  createThumbnail,
  cleanupOnError,
  setUploadType
};
