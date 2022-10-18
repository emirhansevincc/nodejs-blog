const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Photo = require('./models/Photo');
const fileUpload = require('express-fileupload');
const fs = require('fs')  // for creating a folder

const app = express();

mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public')); // We keep static files in the public folder
app.use(express.urlencoded({ extended: true })); // for req.body
app.use(express.json()); // for req.body
app.use(fileUpload());

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index.ejs', { photos: photos });
});

app.get('/about', (req, res) => {
  res.render('about.ejs');
});

app.get('/add', (req, res) => {
  res.render('add.ejs');
});

app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo: photo });
});

app.post('/photos', async (req, res) => {

  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({ ...req.body, image: '/uploads/' + uploadeImage.name });
    res.redirect('/');
  });

});

const port = 3000;

app.listen(port, () => {
  console.log('Server is up');
});
