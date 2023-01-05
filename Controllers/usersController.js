import Users from "../Models/UserModel.js";
import error from "../error.js";

const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const AllUsers = await Users.find();
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
  postUser: async (req, res) => {
    const {
      pseudo = "DefaultPseudo",
      email = "",
      password = "password",
      avatar_url = "",
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
  deleteUser: async (req, res) => {
    const id = req.body.id;
    const user = await Users.deleteOne({ _id: id });
    res.status(204).send(user);
  },
};

export default usersController;
