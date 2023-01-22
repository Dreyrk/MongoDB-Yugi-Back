import BaseDecks from "../Models/BaseDeckModel.js";
import error from "../error.js";

const baseDecksController = {
  getBaseDecks: async (req, res) => {
    try {
      const AllBaseDecks = await BaseDecks.find({});
      res.status(200).send(AllBaseDecks);
    } catch (e) {
      console.error(e);
      res.status(500).send(error.dbGetError);
    }
  },
  getBaseDeckById: async (req, res) => {
    const id = req.params.id;
    try {
      const deck = await BaseDecks.findById(id);
      res.status(200).send(deck);
    } catch (e) {
      res.status(500).send(error.dbGetError);
    }
  },
};

export default baseDecksController;
