const router = require('express').Router();
const auth = require('../middlewars/auth');

const {
  createCard,
  deleteCard,
  getAllCards,
  likeCard,
  dislikeCard,
  getCard,
} = require('../controllers/cards');

router.post('/cards', auth, createCard);
router.delete('/cards/:cardId', auth, deleteCard);
router.get('/cards/:cardId', auth, getCard);
router.get('/cards/', auth, getAllCards);
router.put('/cards/:cardId/likes', auth, likeCard);
router.delete('/cards/:cardId/likes', auth, dislikeCard);
module.exports = router;
