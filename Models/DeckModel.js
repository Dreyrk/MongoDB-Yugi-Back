import mongoose from "mongoose";

export const DeckSchema = new mongoose.Schema(
  {
    name: String,
    difficulty: String,
    description: String,
    cards: Array,
  },
  { timestamps: true }
);

const Decks = mongoose.model("Decks", DeckSchema);

export default Decks;
