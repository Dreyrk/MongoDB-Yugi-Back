import mongoose from "mongoose";
import { DeckSchema } from "./DeckModel.js";

const CardSchema = mongoose.Schema({
  name: String,
  type: String,
  desc: String,
  archetype: String,
  atk: { type: String, default: "0" },
  def: { type: String, default: "0" },
  card_images: [
    {
      image_url: String,
    },
  ],
});

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
