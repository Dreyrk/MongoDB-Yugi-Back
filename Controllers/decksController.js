import Decks from "../Models/DeckModel.js";
import Cards from "../Models/CardModel.js";
import error from "../error.js";

const deckController = {
  getDecks: async (req, res) => {
    try {
      const AllDecks = await Decks.find({});
      res.status(200).send(AllDecks);
    } catch (e) {
      res.status(500).send(error.dbGetError);
    }
  },
  createDecks: async (req, res) => {
    try {
      const { name, description, difficulty } = req.body;

      const newDeck = Decks.create({
        name,
        difficulty,
        description,
      });

      console.log(newDeck);

      res.sendStatus(201);
    } catch (e) {
      console.error(e);
      res.status(500).send(error.dbPostError);
    }
  },
  insertCardsIntoDeck: async (req, res) => {
    try {
      const { cards_id, deck_id } = req.body;

      const deck = await Decks.find({ _id: deck_id });

      const cards = await Cards.find({
        _id: { $in: cards_id },
      });
      console.log(cards);
      console.log(deck[0]);

      deck[0].cards.push(cards);

      res.status(201).send({ data: deck });
    } catch (e) {
      console.error(e);
      res.status(500).send(error.dbPostError);
    }
  },
  resetAllDeck: async (req, res) => {
    await Decks.deleteMany({});
    res.sendStatus(204);
  },
};

export default deckController;
