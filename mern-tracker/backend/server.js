const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const exercisesRouter = require("./routes/exercises.js");
const usersRouter = require("./routes/users.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => console.log(`Server is running on ${port}`));
