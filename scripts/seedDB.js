const mongoose = require("mongoose");
const db = require("../models");

// This script adds seed data for testing

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/patentapps"
);

const applicationSeed = [
  {
    fileNo: "01005.004US1",
    appNo: "15352345",
    PTA: 8
  },
  {
    fileNo: "01111.004US1",
    appNo: "15422345",
    PTA: 459
  }
];

db.App
  .remove({})
  .then(() => db.App.collection.insertMany(applicationSeed))
  .then(data => {
    console.log(data.result.n + " applications inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
