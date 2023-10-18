const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();
const { createUser, loginUser } = require("./controllers/user");

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  () => {
    console.log("connected to db");
  },
  (e) => console.log("DB error", e),
);

// the 'r' is for a response. if you get any response back that means it's not working/running

//app.use((req, res, next) => {
//  req.user = {
//    _id: "651f7b0c1a44987c2d462a6a",
//  };
//  next();
//});

const routes = require("./routes");

app.post("/signup/", createUser);
app.post("/signin/", loginUser);

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("this is working");
});
