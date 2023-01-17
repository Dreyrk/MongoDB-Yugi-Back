import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  pseudo: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar_url: String,
  favs: Array,
  decks: Array,
});

const Users = mongoose.model("Users", UserSchema);

export default Users;
