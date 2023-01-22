import mongoose from "mongoose";
import { DeckSchema } from "./DeckModel.js";
import { CardSchema } from "./CardModel.js";

const UserSchema = new mongoose.Schema(
  {
    pseudo: String,
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    avatar_url: String,
    favs: [CardSchema],
    decks: [DeckSchema],
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UserSchema);

export default Users;
