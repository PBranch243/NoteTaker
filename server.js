const express = require('express');
const { notes } = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');

//make public folder accessible so html can access its css and javascript
app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

//establish api route
app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

  app.post('/api/notes', (req, res) => {
    res.json(req.body);
  });
//establish route for html requests







app.listen(PORT, () => {
    console.log(`API Server now on port ${PORT}!`);
  });