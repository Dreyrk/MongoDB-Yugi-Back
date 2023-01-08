import express from "express";
import usersController from "./Controllers/usersController.js";
import cardsController from "./Controllers/cardsController.js";
import deckController from "./Controllers/decksController.js";
import loginController from "./Auth/login.js";
import auth from "./Auth/auth.js";

const { getCards, getAllCards, getCardById, searchCards, postCard } =
  cardsController;

const { getAllUsers, postUser, deleteUser, searchUser } = usersController;
const { getDecks, postDecks } = deckController;

const { getUserByEmailWithPasswordAndPassToNext } = loginController;

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

/*<<<-------------------------------------------Decks------------------------------------------------>>>*/

router.get("/api/decks", getDecks);

//POST

router.post("/api/decks", postDecks);

/*<<<-------------------------------------------Users------------------------------------------------>>>*/

//GET

router.get("/api/users/", getAllUsers);
router.get("/api/users/search", searchUser);

//POST

router.post("/api/users/", postUser);

//DELETE

router.delete("/api/users/:id", deleteUser);

/*<<<-------------------------------------------Login------------------------------------------------>>>*/

router.post("/api/register", hashPassword, postUser);
router.post(
  "/api/login",
  getUserByEmailWithPasswordAndPassToNext,
  verifyPassword,
  verifyToken
);
export default router;
