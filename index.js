const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const urlRoute = require("./routes/urlRoute");

//enables server to understand json requests
app.use(express.json());

//makes server allow cross-origin
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));

// Middleware Setup
app.use((req, res, next) => {
  req.baseUrl = `${req.protocol}://${req.get("host")}`;
  next();
});

// Connection to DataBase
// connectDB();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("hello");
});

// routes
app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
