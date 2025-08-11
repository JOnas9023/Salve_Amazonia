const jwt = require('jsonwebtoken');
const { executeQuery } = require('../database/connection');

// Middleware de autenticação
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acesso requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar se o usuário ainda existe e está ativo
    const user = await executeQuery(
      'SELECT id, email, role, is_active FROM users WHERE id = ? AND is_active = TRUE',
      [decoded.id]
    );

    if (!user.length) {
      return res.status(403).json({ message: 'Usuário não encontrado ou inativo' });
    }

    req.user = user[0];
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return res.status(403).json({ message: 'Token inválido' });
  }
};

// Middleware de autorização por papel
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso negado para este nível de usuário' });
    }

    next();
  };
};

// Middleware para verificar se é admin
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito a administradores' });
  }
  next();
};

// Middleware para verificar se é admin ou voluntário
const requireAdminOrVolunteer = (req, res, next) => {
  if (!req.user || !['admin', 'volunteer'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Acesso restrito a administradores e voluntários' });
  }
  next();
};

module.exports = {
  authenticateToken,
  authorize,
  requireAdmin,
  requireAdminOrVolunteer
};
