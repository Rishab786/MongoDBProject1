const dotenv = require("dotenv");
  dotenv.config();
const mongoose = require("mongoose");
const connect = async() => {
  await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.w3eayvu.mongodb.net/?retryWrites=true&w=majority`)
}
module.exports =connect;
