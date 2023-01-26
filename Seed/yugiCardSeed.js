import mongoose from "mongoose";
import YugiCards from "../Models/YugiAPICardModel.js";
import yugi from "../Data/CardsData.json" assert { type: "json" };

mongoose
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => YugiCards.deleteMany({}))
  .then(() => YugiCards.insertMany(yugi.data))
  .then(() => {
    mongoose.connection.close();
  });
