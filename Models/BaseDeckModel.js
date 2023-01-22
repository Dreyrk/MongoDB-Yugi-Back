import mongoose from "mongoose";
import { BaseCardSchema } from "./BaseDeckCards.js";

export const DeckSchema = new mongoose.Schema(
  {
    name: String,
    difficulty: String,
    description: String,
    img: String,
    cards: [BaseCardSchema],
  },
  { timestamps: true }
);

const BaseDecks = mongoose.model("BaseDecks", DeckSchema);

export default BaseDecks;
