const express = require("express");
const router = express.Router();
const { checkLogin, checkIsAuthor } = require("../middleware/middleware");
const {
  addProblem,
  getProblems,
  updateProblem,
  deleteProblem,
} = require("../controllers/ProblemController");

router.post("/add", checkLogin, addProblem);
router.get("/", getProblems);
router.put("/:id", checkLogin, checkIsAuthor, updateProblem);
router.delete("/:id", checkLogin, checkIsAuthor, deleteProblem);

module.exports = router;
