import Users from "../Models/UserModel.js";

const loginController = {
  getUserByEmailWithPasswordAndPassToNext: async (req, res, next) => {
    const { email } = req.body;

    Users.find({ email })
      .then((users) => {
        if (users[0] != null) {
          req.user = users[0];
          next();
        } else {
          res.sendStatus(401);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  },
};

export default loginController;
