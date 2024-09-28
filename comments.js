//create web server
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);

  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      console.log("Error writing file:", err);
    }
  });

  res.json(newComment);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});