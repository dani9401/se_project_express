const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandling");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  () => {
    console.log("connected to db");
  },
  (e) => console.log("DB error", e),
);

const routes = require("./routes");

app.use(express.json());
app.use(routes);
app.use(errorHandler);
//app.use((err, req, res, next) => {
//  console.error(err);
//  return res.status(500).send({ message: "An error occurred on the server" });
//});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("this is working");
});
