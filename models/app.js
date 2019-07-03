const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const appSchema = new Schema({
  fileNo: { type: String, required: true },
  appNo: { type: String, required: true },
  PTA: Number
});


const App = mongoose.model("App", appSchema);

module.exports = App;