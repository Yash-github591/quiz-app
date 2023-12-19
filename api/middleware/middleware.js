const jwt = require("jsonwebtoken");
const ProblemModel = require("../models/Problem");

// Middleware to check if the user is logged in
function checkLogin(req, res, next) {
  console.log(req.data);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  console.log(token);

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = decodedToken;
    next();
  });
}

// Middleware to check if the user is the owner of a vehicle
async function checkIsAuthor(req, res, next) {
  try {
    const { id } = req.params;

    const problemDoc = await ProblemModel.findById(id);

    if (!problemDoc) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const isAuthor =
      JSON.stringify(problemDoc.contributor) === JSON.stringify(req.user.id);

    if (!isAuthor) {
      return res
        .status(403)
        .json({ error: "Forbidden: You are not the author of this problem" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  checkLogin,
  checkIsAuthor,
  // uploadMiddleware,
};
