import mongoose from "mongoose";
import BaseCards from "../Models/BaseDeckCards.js";
import yugi from "../Data/baseDeckCardsData.json" assert { type: "json" };

mongoose
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => BaseCards.deleteMany({}))
  .then(() => BaseCards.insertMany(yugi.data))
  .then(() => {
    mongoose.connection.close();
  });
