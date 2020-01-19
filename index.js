const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require('cors'),
  cookieParser = require('cookie-parser'),
  app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api",
  require('./controllers/Websites'),
  require('./controllers/Me')
);


mongoose.connect("mongodb://localhost/admitad-db", {useUnifiedTopology: true, useNewUrlParser: true});

app.listen(5000, () => {
  console.log("SERVER STARTED!");
});

