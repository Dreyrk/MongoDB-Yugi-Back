import error from "../error.js";
import YugiCards from "../Models/YugiAPICardModel.js";

const YugiCardsController = {
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
    const allCards = await YugiCards.find({});
    const cards = await YugiCards.find()
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
    const { page, limit, order = "asc" } = req.query;

    if (page && limit) {
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
      const allCards = await YugiCards.find({});
      const cards = await YugiCards.find()
        .limit(size)
        .skip(size * pages)
        .sort({
          name: order,
        });
      res.status(200).send({
        results: cards,
        totalPages: Math.ceil(allCards.length / size),
      });
    } else {
      const AllCards = await YugiCards.find({});

      res.status(200).send({ results: AllCards, totalCards: AllCards.length });
    }
  },
  searchCards: async (req, res) => {
    try {
      const { name = "", type = "", limit = "", page = "" } = req.query;
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

      const searchedData = await YugiCards.find({
        name: { $regex: name, $options: "i" },
        type: { $regex: type, $options: "i" },
      })
        .select(["name", "type", "card_images.image_url"])
        .limit(size)
        .skip(size * pages);

      if (searchedData) {
        res.status(200).send(searchedData);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
    }
  },
  getCardImg: async (req, res) => {
    try {
      const { page, limit, order = "asc", type } = req.query;

      const pageNumber = Number.parseInt(page);
      const limitNumber = Number.parseInt(limit);

      let pages = 0;

      if (pageNumber > 0 && !Number.isNaN(pageNumber)) {
        pages = pageNumber;
      }

      let size = 10;

      if (limitNumber > 0 && !Number.isNaN(limitNumber)) {
        size = limitNumber;
      }
      const allCards = await YugiCards.find({});
      const cards = await YugiCards.find()
        .select(["card_images.image_url", "type"])
        .limit(size)
        .skip(size * pages)
        .sort({
          Name: order,
        });
      res.status(200).send({
        results: cards,
        totalPages: Math.ceil(allCards.length / size),
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
  getCardById: async (req, res) => {
    const id = req.params.id;
    try {
      const OneCards = await YugiCards.findById(id);
      res.status(200).send(OneCards);
    } catch (err) {
      console.error(err);
      res.status(500).send(error.dbGetError);
    }
  },
  postCard: async (req, res) => {
    const { name = "DefaultName", rarity = "", description = "" } = req.body;

    try {
      const newCard = new YugiCards({
        name: name,
        rarity: rarity,
        description: description,
      });
      const savedCard = await newCard.save();
      res.status(201).send({ data: savedCard });
    } catch (e) {
      console.error(err);
      res.status(500).send(error.dbPostError);
    }
  },
};

export default YugiCardsController;
