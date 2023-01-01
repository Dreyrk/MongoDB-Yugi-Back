import UserModel from "../Models/UserModel.js";
import error from "../error.js";

const usersController = {
  getAllUsers: async (req, res) => {
    const AllUsers = await UserModel.findAndCountAll({
      attributes: ["pseudo", "email", "avatar_url"],
    });
    res
      .status(200)
      .send({
        results: AllUsers.rows,
        totalUsers: AllUsers.count,
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(error.dbGetError);
      });
  },

  getUserByEmailWithPasswordAndPassToNext: (req, res, next) => {
    const { email } = req.body;

    database
      .query("select * from users where email = ?", [email])
      .then(([users]) => {
        if (users[0] != null) {
          req.user = users[0];

          next();
        } else {
          res.status(401).send("bruh");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  },
  postUser: async (req, res) => {
    const {
      pseudo = "DefaultPseudo",
      email = "",
      password = "password",
      avatar_url = "",
    } = req.body;
    const newUser = await UserModel.create(
      {
        pseudo: pseudo,
        email: email,
        password: password,
        avatar_url: avatar_url,
      },
      {
        isNewRecord: true,
      }
    );
    res
      .status(201)
      .location(`/api/users/${result.insertId}`)
      .send({ data: newUser })
      .catch((err) => {
        console.error(err);
        res.status(500).send(error.dbPostError);
      });
  },
};

export default usersController;
