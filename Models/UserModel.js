import mongoose from "mongoose";
import { CardSchema } from "./CardModel.js";
import { DeckSchema } from "./DeckModel.js";

const UserSchema = new mongoose.Schema({
  pseudo: String,
  email: String,
  password: String,
  avatar_url: String,
  favs: [CardSchema],
  decks: [DeckSchema],
});

const Users = mongoose.model("Users", UserSchema);

export default Users;
