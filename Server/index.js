const express = require("express");
const dbConfiq = require("./config/db.config");
const mongoose = require("mongoose");
const cors = require("cors");

const bodyParser = require("body-parser");
const admissionRouter=require('./src/Routes/admission.apiRoutes')
mongoose.Promise = global.Promise;


const app=express();
const port = 4000;


mongoose
  .connect(dbConfiq.url)
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("could  not connect to the database");
    // process.end()
  });
  

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


app.use("/api",admissionRouter);


  app.listen(port, () => {
    console.log(`Node serer is listenting on port${port}`);
  });