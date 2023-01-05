import Cards from "../Models/CardModel.js";
import error from "../error.js";
import usersController from "./usersController.js";

const getCardsPaginate = (model) => {
  (req, res) => {
    const { page, limit, order } = req.query;
    const pageNumber = Number.parseInt(page);
    const limitNumber = Number.parseInt(limit);

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limit;

    const results = {};

    // if(endIndex > model.length) {
    //   results.next = {
    //     page: page +
    //   }
    // }
  };
};

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
      .status(201)
      .send({ data: newCard })
      .catch((err) => {
        console.error(err);
        res.status(500).send(error.dbPostError);
      });
  },
};

export default CardsController;
