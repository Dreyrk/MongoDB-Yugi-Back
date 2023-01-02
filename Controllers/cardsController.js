import Cards from "../Models/CardModel.js";
import error from "../error.js";

const CardsController = {
  getCards: async (req, res) => {
    const { page, limit } = req.query;

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

    const cards = await Cards.find()
      .limit(size)
      .skip(size * pages)
      .sort({
        Name: "asc",
      });
    res.status(200).send({
      results: cards.rows,
      totalPages: Math.ceil(cards.count / size),
    });
  },
  getAllCards: async (req, res) => {
    try {
      const AllCards = await Cards.find({});
      console.log(AllCards);
      res.status(200).send(AllCards);
    } catch (err) {
      res.status(500).send(error.dbGetError);
    }
  },
  searchCards: async (req, res) => {
    const { name = "", rarity = "" } = req.query;

    const Cards = await Cards.findAndCountAll({});
    res
      .status(200)
      .send({
        results: Cards.rows,
        totalCards: Cards.count,
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(error.dbGetError);
      });
  },
  getCardById: async (req, res) => {
    const id = req.params.id;
    const OneCards = await Cards.findById(id);
    res
      .status(200)
      .send(OneCards)
      .catch((err) => {
        console.error(err);
        res.status(500).send(error.dbGetError);
      });
  },
  postCard: async (req, res) => {
    console.log(req.body);
    const { name = "DefaultName", rarity = "", description = "" } = req.body;
    const newCard = await Cards.create({
      Name: name,
      Rarity: rarity,
      Description: description,
    });
    res
      .sendStatus(201)
      .send({ data: newCard })
      .catch((err) => {
        console.error(err);
        res.status(500).send(error.dbPostError);
      });
  },
};

export default CardsController;
