const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect(process.env["MONGO_DB_CONNECTION"]).then(function () {
// mongoose.connect("mongodb://127.0.0.1:27017/homeBuddy").then(function () {
  console.log("Welcome! you are connected to MongoDB");
});
var userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  username: String,
  password: String,
  mobileNumber: String,
  orderId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", userSchema);
