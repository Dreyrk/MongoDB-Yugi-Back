import mongoose from "mongoose";

export const BaseCardSchema = new mongoose.Schema({
  name: String,
  stars: Number,
  effect: String,
  ATK: Number,
  DEF: Number,
  Category: String,
});

const BaseCards = mongoose.model("BaseCards", BaseCardSchema);

export default BaseCards;
