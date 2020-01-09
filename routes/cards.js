const router = require('express').Router();
const auth = require('../middlewars/auth');
const Card = require('../models/card');
const cookieParser = require('cookie-parser');

const {
  createCard,
  deleteCard,
  getAllCards,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/cards', auth, createCard);
router.delete('/cards/:cardId', deleteCard);
router.get('/cards/', auth, getAllCards);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);
module.exports = router;
