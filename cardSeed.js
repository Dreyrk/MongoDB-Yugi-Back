import mongoose from "mongoose";
import Cards from "./Models/CardModel.js";
import yugi from "./YugiData.json" assert { type: "json" };

mongoose
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const cardSeed = async () => {
      await Cards.deleteMany({});
      await Cards.insertMany(yugi.data);
    };

    cardSeed().then(() => {
      mongoose.connection.close();
    });
  });
