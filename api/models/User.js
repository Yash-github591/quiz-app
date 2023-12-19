// a model represents a collection in the database.
// A collection is a group of documents (data).
// A document is a set of key-value pairs.
// a database is a group of collections in a noSQL database.

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
  subjects_administered: { type: Array, default: [] },
  completed_exercises: { type: Array, default: [] }, // stores the id of the completed exercises
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
