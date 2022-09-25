const express = require("express");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Photo = require("./models/Photo");
const app = express();
const methodOverride=require('method-override');
//CONNECT DB
mongoose.connect("mongodb://localhost:27017/starter_blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//MİDDLEWARES
app.use(express.static("public")); // statik dosyaları kullanmak için bir middleware statik dosyalarım public isimli klasörde oldğunu belirtiyorum
app.use(express.urlencoded({ extended: true })); // urldeki datayı okur
app.use(express.json()); // urlde okunan datayı json formatına dönüştürür
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods: ['GET','POST'],
}));
//TEMPLATE ENGİNE
app.set("view engine", "ejs");

//ROUTERS
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dataCreated');
  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});
app.get('/photos/edit/:id',async (req,res)=>{
  const photo=await Photo.findOne({_id: req.params.id});
  res.render('edit',{
    photo,
  });
});
app.put('/photos/:id', async(req,res)=>{
  const photo= await Photo.findOne({_id: req.params.id});
  photo.title= req.body.title;
  photo.description= req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
});
app.delete('/photos/:id',async (req,res)=>{
  const photo=await Photo.findOne({_id: req.params.id});
  let deletedImagePath= __dirname+'/public'+photo.image;
  fs.unlinkSync(deletedImagePath);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

app.post("/photos", async (req, res) => {
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  } 
  
  let uploadImage = req.files.image;
  let uploadPath = __dirname + "/public/uploads/" + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/'+uploadImage.name,
    });
    res.redirect("/");
  }); 
});

const port = 3000; // This app starts a server and listens on port 3000 for connections.
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
