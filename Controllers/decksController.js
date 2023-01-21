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
  getDeckById: async (req, res) => {
    const id = req.params.id;
    try {
      const deck = await Decks.findById(id);
      res.status(200).send(deck);
    } catch (e) {
      res.status(500).send(error.dbGetError);
    }
  },
  createDecks: async (req, res) => {
    try {
      const { name, description, difficulty, img } = req.body;

      const newDeck = Decks.create({
        name,
        difficulty,
        description,
        img,
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

      const cards = await Cards.find({
        _id: { $in: cards_id },
      });
      console.log(cards);

      console.log(cards_id);

      const newDeck = await Decks.updateOne({ _id: deck_id }, { cards: cards });

      res.status(201).send({ data: newDeck });
    } catch (e) {
      console.error(e);
      res.status(500).send(error.dbPostError);
    }
  },
  deleteCardsFromDeck: async (req, res, next) => {
    const { cards_id, deck_id } = req.body;

    if (!cards_id || !deck_id) {
      return res.status(500).send(error.dbPostError); // Send USER error (leur faute)
    }

    try {
      const newDeck = await Decks.deleteOne(); // where deck_id and cards_id === cards_id
    } catch (e) {
      // send DB Errror (ta faute)
    } // et refait tout tes controlleur comme ça
  },
  updateDeck: async (req, res) => {
    const id = req.params.id;
    const { name, difficulty, description, img } = req.body;

    try {
      const updatedDeck = await Decks.updateOne(
        { _id: id },
        { name, difficulty, description, img }
      );

      res.status(204).send(updatedDeck);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },
  resetAllDeck: async (req, res) => {
    await Decks.deleteMany({});
    res.sendStatus(204);
  },
};

export default deckController;
