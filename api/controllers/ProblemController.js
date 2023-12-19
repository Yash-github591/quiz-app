const ProblemModel = require("../models/Problem");

const addProblem = async (req, res) => {
  try {
    const { subject, difficulty, problem_statement, answer } = req.body;
    const problemDoc = await ProblemModel.create({
      contributor: req.user.id,
      subject,
      difficulty,
      problem_statement,
      answer,
    });
    res
      .status(200)
      .json({ message: "Problem added successfully", body: problemDoc });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getProblems = async (req, res) => {
  try {
    const problems = await ProblemModel.find();
    res.json(problems);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const problemDoc = await ProblemModel.findById(id);
    if (problemDoc) {
      res.status(200).json(problemDoc);
    } else {
      res.status(400).json({ error: "Problem not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const problemDoc = await ProblemModel.findById(id);
    if (problemDoc) {
      const updatedProblem = await ProblemModel.updateOne(
        { _id: id },
        req.body
      );
      res.json(updatedProblem);
    } else {
      res.status(400).json({ error: "Problem not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const problemDoc = await ProblemModel.findById(id);
    if (problemDoc) {
      const deletedProblem = await ProblemModel.deleteOne({ _id: id });
      res.json(deletedProblem);
    } else {
      res.status(400).json({ error: "Problem not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  addProblem,
  getProblem,
  getProblems,
  updateProblem,
  deleteProblem,
};
