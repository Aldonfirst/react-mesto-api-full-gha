const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errorsCatch/UnauthorizedError');
const { JWT_SECRET } = require('../utils/config');

function authMiddleware(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError('Требуется авторизация');
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authMiddleware,
};
