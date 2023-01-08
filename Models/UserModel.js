import mongoose from "mongoose";
import { CardSchema } from "./CardModel.js";
import { DeckSchema } from "./DeckModel.js";

const UserSchema = new mongoose.Schema({
  pseudo: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar_url: String,
  favs: [CardSchema],
  decks: [DeckSchema],
});

const Users = mongoose.model("Users", UserSchema);

export default Users;
