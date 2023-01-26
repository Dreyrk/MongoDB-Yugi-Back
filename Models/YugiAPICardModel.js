import mongoose from "mongoose";

const YugiCardSchema = mongoose.Schema({
  name: String,
  type: String,
  frameType: String,
  desc: String,
  race: String,
  archetype: String,
  atk: { type: String, default: "0" },
  def: { type: String, default: "0" },
  card_sets: [
    {
      set_code: String,
      set_rarity: String,
      set_price: String,
    },
  ],
  card_images: [
    {
      image_url: String,
      image_url_small: String,
      image_url_cropped: String,
    },
  ],
  card_prices: [
    {
      cardmarket_price: String,
    },
  ],
});

const YugiCards = mongoose.model("YugiCards", YugiCardSchema);

export default YugiCards;
