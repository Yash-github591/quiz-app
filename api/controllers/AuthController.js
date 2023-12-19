const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const register = async (req, res) => {
  const {
    username,
    password,
    subjects_managed,
    completed_exercises,
    subject_scores,
  } = req.body;
  const isExisting = await UserModel.findOne({ username });

  if (isExisting) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const userDoc = await UserModel.create({
      username,
      password: bcrypt.hashSync(password, saltRounds),
      completed_exercises: [],
      subject_scores: {},
    });

    // generate a token
    jwt.sign(
      {
        username,
        id: userDoc._id,
        completed_exercises: [],
        subject_scores: {},
      },
      process.env.SECRET_KEY,
      (err, token) => {
        if (err) {
          res.status(400).json(err);
        } else {
          // sends a cookie to the client with the token as the value of the cookie.
          console.log(token);
          res
            .cookie("token", token, {
              sameSite: "none", // this means that the cookie is sent only in requests to the same domain as the domain in the request URL
              secure: true, // The "secure" attribute is also required for cookies with SameSite="None"
            })
            .json({
              username,
              id: userDoc._id,
              completed_exercises,
              subject_scores,
            });
        }
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await UserModel.findOne({ username });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      // Generate a token
      jwt.sign(
        {
          username,
          id: userDoc._id,
          completed_exercises: userDoc.completed_exercises,
          subject_scores: userDoc.subject_scores,
        },
        process.env.SECRET_KEY,
        (err, token) => {
          if (err) {
            res.status(400).json(err);
          } else {
            console.log(token);
            res
              .cookie("token", token, {
                sameSite: "none", // this is needed for the client to be able to read the cookie
                secure: true, // The "secure" attribute is also required for cookies with SameSite="None"
              })
              .json({
                username,
                id: userDoc._id,
                completed_exercises: userDoc.completed_exercises,
                subject_scores: userDoc.subject_scores,
              });
          }
        }
      );
    } else {
      res.status(400).json({ error: "Password is incorrect" });
    }
  } else {
    res.status(400).json({ error: "Username doesn't exists" });
  }
};

const logout = (req, res) => {
  res
    .cookie("token", "", {
      sameSite: "none",
      secure: true, // The "secure" attribute is also required for cookies with SameSite="None"
    })
    .json("ok");
};

const getProfile = (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user); // req.user is the user object from the token added by the checkLogin middleware
};

const getAllProfiles = async (req, res) => {
  try {
    const userData = await UserModel.find({}).select("-password");
    res.status(200).json(userData);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await UserModel.findById(id);
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(userData);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  const { id, username, completed_exercises, subject_scores } = req.body;
  try {
    const userDoc = await UserModel.findById(id);
    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }
    await userDoc.updateOne({
      username,
      password: userDoc.password,
      completed_exercises,
      subject_scores,
    });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
};
