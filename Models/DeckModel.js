import mongoose from "mongoose";
import { CardSchema } from "./CardModel.js";

export const DeckSchema = new mongoose.Schema(
  {
    name: String,
    difficulty: String,
    description: String,
    cards: [CardSchema],
  },
  { timestamps: true }
);

const Decks = mongoose.model("Decks", DeckSchema);

export default Decks;
