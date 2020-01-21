// Объявление переменной
const Card = require('../models/card');

// Функции
function errorSend(res) {
  res.status(500).send({ message: 'Произошла ошибка' });
}

// Создание карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err.message));
};

// Удаление карточки
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (card.owner.toString() === ownerId) {
        Card.findByIdAndRemove(cardId)
          .then((card) => res.send({ data: card }))
          .catch(() => errorSend(res));
      } else {
        return res.status(401).send({ message: 'Вы не имеете доступ к удалению чужих карточек' });
      }
    })
    .catch(() => res.status(404).send({ message: 'Не найден объект с таким идентификатором' }));
};

// Получить все карточки
module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => errorSend(res));
};

// Получить одну карточку
module.exports.getCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => res.send(card.owner))
    .catch(() => errorSend(res));
};

// Поставить лайк карточке
module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((like) => res.send({ data: like }))
    .catch(() => errorSend(res));
};

// Удалить лайк карточке
module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((like) => res.send({ data: like }))
    .catch(() => errorSend(res));
};
