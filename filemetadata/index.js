var express = require('express');
var cors = require('cors');
const multer  = require('multer');
const upload = multer({dest: './uploads'});
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// name type size
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
    console.log(req.file);
    let filename = req.file.originalname;
    let mimeType =  req.file.mimetype;
    let fileSize = req.file.size;
    let info = {
      name : filename, 
      type: mimeType, 
      size: fileSize
    };

    console.log(info);
    res.json(info);
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
