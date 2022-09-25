const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// connect db
mongoose.connect("mongodb://localhost:27017/starter_blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// create schema
const photoSchema = new Schema({
  title: String,
  description: String,
});
// create model
const Photo = mongoose.model("Photo", photoSchema); // create collection
// create a photo
/* Photo.create({ // create document
  title: "photo title 2",
  description: "photo description 2",
}); */
// veri sorgulama read a photo
/* Photo.find({},(err,data)=>{
  if(err){
    console.log(err);
  }
  console.log(data);
}); */
// güncelleme update photo
let id = "62d3f350d9393a47a5a8c4b9";
/* Photo.findByIdAndUpdate(
  id,
  {
    title: "update title 2",
    description: "update description 2",
  },
  {
    new: true,
  },
  (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  }
); */
// silme işlemi delete photo
/* Photo.findByIdAndDelete(
  id,
  {
    title: "photo title 1",
  },
  (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  }
); */
