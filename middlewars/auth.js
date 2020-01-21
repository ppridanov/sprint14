const jwt = require('jsonwebtoken');

function errorStatus(res) {
  return res
    .status(401)
    .send({ message: 'Доступ запрещен. Необходима авторизация' });
}

module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  const JWT_SECRET = 'f86fa1ca3730b0a770c44debf1cea55ae915f2bd9809cb5ae1239a1f6fc80314';
  if (!cookie) {
    errorStatus(res);
  }

  let payload;

  try {
    payload = jwt.verify(cookie, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    errorStatus(res);
  }

  next();
};
