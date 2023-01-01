import mongoose from "mongoose";

export const CardSchema = new mongoose.Schema({
  Name: String,
  Rarity: String,
  Description: String,
});

const Cards = mongoose.model("Cards", CardSchema);

export default Cards;
