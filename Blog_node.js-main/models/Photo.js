const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create schema
const schemaPhoto = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  dataCreated: {
    type: Date,
    default: Date.now,
  },
});
//create model
const Photo=mongoose.model('Photo',schemaPhoto);
// export model
module.exports=Photo;
