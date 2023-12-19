const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const AuthRoutes = require("./routes/AuthRoutes");
const ProblemRoutes = require("./routes/ProblemRoutes");
const port = process.env.PORT || 4000;

require("dotenv").config();

// connect mongoose to mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors({ credentials: true, origin: CLIENT_URL })); // credentials: true allows us to send cookies from the server to the client
app.use(express.json());
app.use(cookieParser()); // allows us to access the cookies sent by the client in the request object (req.cookies)
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/auth", AuthRoutes);
app.use("/api/problems", ProblemRoutes);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
