const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Use EJS
app.set('view engine', 'ejs');

// Serve static files from "public"
app.use(express.static('public'));


// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, unique);
  }
});

const upload = multer({ storage: storage });

// Form page
app.get('/', (req, res) => {
res.render('index', { imagePath: null });

});

// Handle Upload
app.post('/upload', upload.single('myFile'), (req, res) => {
  if (!req.file) return res.send('No file uploaded');
const filePath = `/uploads/${req.file.filename}`;
res.render('index', { imagePath: filePath });
});

// Start
app.listen(3000, () => {
  console.log('http://localhost:3000');
});


