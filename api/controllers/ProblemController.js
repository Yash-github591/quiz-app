const addProblem = async (req, res) => {
  try {
    const problem = new ProblemModel(req.body);
    const problemDoc = await problem.save();
    res.json(problemDoc);
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

module.exports = { addProblem, getProblems, updateProblem, deleteProblem };
