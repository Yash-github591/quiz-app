const SubjectModel = require("../models/Subject");

const createSubject = async (req, res) => {
  try {
    const { subject_name } = req.body;
    const { id } = req.user; // id of the admin user, added by the middleware

    const subjectDoc = await SubjectModel.create({
      administrator: id,
      subject_name,
    });

    res.status(201).json(subjectDoc);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const subjectDocs = await SubjectModel.find().populate("administrator");
    res.json(subjectDocs);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { createSubject, getAllSubjects };
// Compare this snippet from routes/SubjectRoutes.js:
