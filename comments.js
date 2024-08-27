// Create web server
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Get all comments
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
    } else {
      res.send(data);
    }
  });
});

// Add a comment
app.post('/comments', (req, res) => {
  const { author, text } = req.body;

  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
    } else {
      const comments = JSON.parse(data);
      comments.push({ author, text });

      fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          res.status(500).send('Server error');
        } else {
          res.send(comments);
        }
      });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
