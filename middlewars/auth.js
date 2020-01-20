const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = `Bearer ${req.cookies.jwt}`;
  const JWT_SECRET = 'f86fa1ca3730b0a770c44debf1cea55ae915f2bd9809cb5ae1239a1f6fc80314';
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Доступ запрещен. Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Доступ запрещен. Необходима авторизация' });
  }

  next();
};
