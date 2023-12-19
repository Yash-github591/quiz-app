const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProblemSchema = new Schema({
  contributor: { type: Schema.Types.ObjectId, ref: "User" },
  difficulty: { type: Number, required: true },
  subject: {
    type: String,
    enum: ["Hindi", "English", "French", "Japanese"],
    required: true,
  },
  answer: { type: String, required: true },
  problem_statement: { type: String, required: true },
});

const ProblemModel = model("Problem", ProblemSchema);
module.exports = ProblemModel;
