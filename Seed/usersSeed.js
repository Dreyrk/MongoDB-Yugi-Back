import mongoose from "mongoose";
import Users from "../Models/UserModel.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => Users.deleteMany({}))
  .then(() => {
    mongoose.connection.close();
  });
