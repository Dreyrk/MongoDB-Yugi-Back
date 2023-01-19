import Users from "../Models/UserModel.js";
import error from "../error.js";
import Decks from "../Models/DeckModel.js";
import Cards from "../Models/CardModel.js";

const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const AllUsers = await Users.find({});
      res.status(200).send(AllUsers);
    } catch (err) {
      res.status(500).send(error.dbGetError);
    }
  },
  getUserById: async (req, res) => {
    const id = req.body.id;
    try {
      const OneUsers = await Users.findById({ _id: id });
      res.status(200).send(OneUsers);
    } catch (err) {
      res.status(500).send(error.dbGetError);
    }
  },
  searchUser: async (req, res) => {
    const { pseudo, email } = req.body;

    let search = {
      email: "",
      pseudo: "",
    };

    if (email && pseudo) {
      search = {
        email,
        pseudo,
      };
    }

    if (email) {
      search = { email };
    }
    if (pseudo) {
      search = { pseudo };
    }

    try {
      const users = await Users.find(search);

      if (users) {
        res.status(200).send(users);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.status(500).send(error.dbGetError);
    }
  },
  postUser: async (req, res) => {
    const {
      pseudo = "DefaultPseudo",
      email = "default@email.com",
      password = "password",
      avatar_url = "none",
    } = req.body;

    const newUser = await Users.create({ pseudo, email, password, avatar_url });

    res
      .status(201)
      .send({ data: newUser })
      .catch((err) => {
        console.error(err);
        res.status(500).send(error.dbPostError);
      });
  },
  insertDeckUser: async (req, res) => {
    try {
      const { user_id, deck_id } = req.body;

      const deck = await Decks.find({
        _id: { $in: deck_id },
      });

      const newUserWithNewDeck = await Users.updateOne(
        { _id: user_id },
        { decks: deck }
      );

      res.status(201).send({ data: newUserWithNewDeck });
    } catch (e) {
      console.error(e);
      res.status(500).send(error.user);
    }
  },
  insertCardFav: async (req, res) => {
    try {
      const { user_id, card_id } = req.body;

      const cards = await Cards.find({
        _id: { $in: card_id },
      });

      const newUserWithFavs = await Users.updateOne(
        { _id: user_id },
        { favs: cards }
      );

      res.status(201).send({ data: newUserWithFavs });
    } catch (e) {
      console.error(e);
      res.status(500).send(error.user);
    }
  },
  deleteUser: async (req, res) => {
    const id = req.body.id;
    const user = await Users.deleteOne({ _id: id });
    res.status(204).send(user);
  },
  resetUsers: (req, res) => {
    Users.deleteMany({});
    res.sendStatus(204);
  },
};

export default usersController;
