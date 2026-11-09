const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  CREATED_STATUS,
  CARD_NOT_FOUND_MESSAGE,
  FORBIDDEN_CARD_MESSAGE,
} = require('../utils/constants');

const createCardNotFoundError = () => new NotFoundError(CARD_NOT_FOUND_MESSAGE);

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED_STATUS).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .orFail(createCardNotFoundError)
  .then((card) => {
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError(FORBIDDEN_CARD_MESSAGE);
    }

    return card.deleteOne().then(() => res.send(card));
  })
  .catch(next);

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(createCardNotFoundError)
  .then((card) => res.send(card))
  .catch(next);

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(createCardNotFoundError)
  .then((card) => res.send(card))
  .catch(next);

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
