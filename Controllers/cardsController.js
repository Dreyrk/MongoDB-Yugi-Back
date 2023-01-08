import Cards from "../Models/CardModel.js";
import error from "../error.js";

const CardsController = {
  getCards: async (req, res) => {
    const { page, limit, order = "asc" } = req.query;

    const pageNumber = Number.parseInt(page);
    const limitNumber = Number.parseInt(limit);

    let pages = 0;

    if (pageNumber > 0 && !Number.isNaN(pageNumber)) {
      pages = pageNumber;
    }

    let size = 12;

    if (limitNumber > 0 && !Number.isNaN(limitNumber)) {
      size = limitNumber;
    }
    const allCards = await Cards.find({});
    const cards = await Cards.find()
      .limit(size)
      .skip(size * pages)
      .sort({
        Name: order,
      });
    res.status(200).send({
      results: cards,
      totalPages: Math.ceil(allCards.length / size),
    });
  },
  getAllCards: async (req, res) => {
    try {
      const AllCards = await Cards.find({});
      res.status(200).send(AllCards);
    } catch (err) {
      res.status(500).send(error.dbGetError);
    }
  },
  searchCards: async (req, res) => {
    const { name = "", rarity = "" } = req.query;

    try {
      const users = await Cards.find({ name, rarity });

      if (users) {
        res.status(200).send(users);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.status(500).send(error.dbGetError);
    }
  },
  getCardById: async (req, res) => {
    const id = req.params.id;
    try {
      const OneCards = await Cards.findById(id);
      res.status(200).send(OneCards);
    } catch (err) {
      console.error(err);
      res.status(500).send(error.dbGetError);
    }
  },
  postCard: async (req, res) => {
    const { name = "DefaultName", rarity = "", description = "" } = req.body;

    try {
      const newCard = new Cards({
        Name: name,
        Rarity: rarity,
        Description: description,
      });
      const savedCard = await newCard.save();
      res.status(201).send({ data: savedCard });
    } catch (e) {
      console.error(err);
      res.status(500).send(error.dbPostError);
    }
  },
};

export default CardsController;
