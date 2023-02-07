import Users from "../Models/UserModel.js";
import error from "../error.js";
import Decks from "../Models/DeckModel.js";
import YugiCards from "../Models/YugiAPICardModel.js";

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
    const { pseudo, email, password = "bruh", avatar_url } = req.body;

    const newUser = await Users.create({
      pseudo,
      email,
      password,
      avatar_url,
    });

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
  getFavs: async (req, res) => {
    const { user_id } = req.params;

    try {
      const userFavs = await Users.findById(user_id).select("favs");

      res.status(200).send({ results: userFavs, totalFavs: userFavs.length });
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },
  resetFavs: async (req, res) => {
    const { user_id } = req.params;

    try {
      const user = await Users.findByIdAndUpdate(user_id, {
        favs: [],
      });
      console.log(user);

      res.sendStatus(204);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },
  insertCardFav: async (req, res) => {
    const { user_id, card_id } = req.body;

    try {
      const user = await Users.findById(user_id);

      const favCard = await YugiCards.findById(card_id).select([
        "name",
        "type",
        "atk",
        "def",
        "card_images.image_url",
        "desc",
      ]);

      console.log(favCard);

      user.favs.push(favCard);

      user.save();

      res.status(201).send(user);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },
  removeFavs: async (req, res) => {
    const { user_id, card_id } = req.body;
    try {
      await Users.findByIdAndUpdate(user_id, {
        $pullAll: { favs: [{ _id: card_id }] },
      });

      const user = await Users.findById(user_id).select("favs");

      res.status(204).send({ message: "Removed", data: user });
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
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
