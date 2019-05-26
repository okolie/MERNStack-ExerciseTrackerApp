const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
  .catch(err => console.error("ERROR: " + err));

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongo database connection established sucessfully");
});

const usersRouter = require("./routes/users");
const exercisesRouter = require("./routes/exercises");

app.use("/users", usersRouter);
app.use("/exercises", exercisesRouter);
// app.get("/", (req, res) => {
//   res.send("God is the greatest everyday");
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
