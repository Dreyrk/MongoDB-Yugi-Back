import mongoose from "mongoose";
import Cards from "../Models/CardModel.js";
import yugi from "../Data/YugiData.json" assert { type: "json" };

mongoose
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => Cards.deleteMany({}))
  .then(() => Cards.insertMany(yugi.data))
  .then(() => {
    mongoose.connection.close();
  });
