import Decks from "../Models/DeckModel.js";
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
  postDecks: async (req, res) => {
    try {
      const {
        name,
        difficulty,
        description,
        cards = ["default", "default2"],
      } = req.body;

      const newDeck = await new Decks({ name, difficulty, description, cards });
    } catch (e) {
      res.status(500).send(error.dbPostError);
    }
  },
};

export default deckController;
