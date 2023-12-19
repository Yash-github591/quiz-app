const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const subjectSchema = new Schema({
  administrator: { type: Schema.Types.ObjectId, ref: "User" }, // stores the id of the admin user
  subject_name: { type: String, required: true },
});

const SubjectModel = model("Subject", subjectSchema);
module.exports = SubjectModel;
