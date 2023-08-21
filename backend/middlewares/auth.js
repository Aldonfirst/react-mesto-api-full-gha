const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errorsCatch/UnauthorizedError');
// const { SECRET_KEY } = require('../utils/constants');
const SECRET_KEY = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError('Требуется авторизация');
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authMiddleware,
};
