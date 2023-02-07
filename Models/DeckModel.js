import mongoose from "mongoose";

const DeckCardSchema = {
  name: String,
  type: String,
  frameType: String,
  desc: String,
  race: String,
  archetype: String,
  atk: { type: String, default: "0" },
  def: { type: String, default: "0" },
  card_images: [
    {
      image_url: String,
      image_url_small: String,
      image_url_cropped: String,
    },
  ],
};

export const DeckSchema = new mongoose.Schema(
  {
    name: String,
    difficulty: String,
    description: String,
    img: String,
    cards: [DeckCardSchema],
  },
  { timestamps: true }
);

const Decks = mongoose.model("Decks", DeckSchema);

export default Decks;
