import express from "express";
import usersController from "./Controllers/usersController.js";
import cardsController from "./Controllers/cardsController.js";
import auth from "./Middlewares/auth.js";

const { getCards, getAllCards, getCardById, searchCards, postCard } =
  cardsController;

const { getAllUsers, postUser, getUserByEmailWithPasswordAndPassToNext } =
  usersController;

const { hashPassword, verifyPassword, verifyToken } = auth;

/*<<<-------------------------------------------Cards------------------------------------------------>>>*/

const router = express.Router();
//GET

router.get("/", (req, res, next) => {
  res.status(200).send("Welcome !");
});

router.get("/api/cards", getCards);
router.get("/api/all", getAllCards);
router.get("/api/cards/:id", getCardById);
router.get("/api/search/", searchCards);

//POST

router.post("/api/cards", postCard);

/*<<<-------------------------------------------Users------------------------------------------------>>>*/

//GET

router.get("/api/users/", getAllUsers);

//POST

router.post("/api/users/", postUser);

/*<<<-------------------------------------------Login------------------------------------------------>>>*/

router.post("/login", verifyPassword, getUserByEmailWithPasswordAndPassToNext);

export default router;
