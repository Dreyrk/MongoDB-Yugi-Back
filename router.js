import express from "express";
import usersController from "./Controllers/usersController.js";
import cardsController from "./Controllers/cardsController.js";
import deckController from "./Controllers/decksController.js";
import baseDeckController from "./Controllers/baseDecksController.js";
import loginController from "./Auth/login.js";
import auth from "./Auth/auth.js";

const { getCards, getAllCards, getCardById, searchCards, postCard } =
  cardsController;

const {
  getAllUsers,
  postUser,
  deleteUser,
  searchUser,
  insertDeckUser,
  insertCardFav,
  resetUsers,
} = usersController;

const {
  getDecks,
  getDeckById,
  createDecks,
  insertCardsIntoDeck,
  resetAllDeck,
  updateDeck,
} = deckController;

const { getBaseDecks, getBaseDeckById } = baseDeckController;

const { getUserByEmailWithPasswordAndPassToNext } = loginController;

const { hashPassword, verifyPassword, verifyToken } = auth;

/*<<<-------------------------------------------Cards------------------------------------------------>>>*/

const router = express.Router();
//GET

router.get("/", (req, res, next) => {
  res.status(200).send("Welcome !");
});

router.get("/api/cards", getCards);
router.get("/api/cards/all", getAllCards);
router.get("/api/cards/:id", getCardById);
router.get("/api/cards/search/", searchCards);

//POST

router.post("/api/cards", postCard);

/*<<<-------------------------------------------Decks------------------------------------------------>>>*/

//GET

router.get("/api/decks", getDecks);
router.get("/api/decks/:id", getDeckById);

router.get("/api/decks/base", getBaseDecks);
router.get("/api/decks/base/:id", verifyToken, getBaseDeckById);

//POST

router.post("/api/decks", createDecks);
router.post("/api/decks/insertCards", insertCardsIntoDeck);

//PUT

router.put("/api/decks/:id", updateDeck);

//DELETE

router.delete("/api/decks/reset", verifyToken, resetAllDeck);

/*<<<-------------------------------------------Users------------------------------------------------>>>*/

//GET

router.get("/api/users/", getAllUsers);
router.get("/api/users/search", searchUser);

//DELETE

router.delete("/api/users/:id", verifyToken, deleteUser);
router.delete("/api/users/reset", resetUsers);

//POST

router.post("/api/users/insert/decks", verifyToken, insertDeckUser);
router.post("/api/users/insert/cards", verifyToken, insertCardFav);

/*<<<-------------------------------------------Login------------------------------------------------>>>*/

router.post("/api/register", hashPassword, postUser);
router.post(
  "/api/login",
  getUserByEmailWithPasswordAndPassToNext,
  verifyPassword,
  verifyToken
);
export default router;
