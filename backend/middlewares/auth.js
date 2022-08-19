const jwt = require('jsonwebtoken');
const UnAuthorizedErr = require('../errors/UnAuthorizedErr');

const { JWT_SECRET = 'some-secret-key', NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnAuthorizedErr('Необходима авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new UnAuthorizedErr('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
