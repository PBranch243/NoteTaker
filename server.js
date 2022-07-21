const express = require('express');
const { database } = require('./db/db.json');
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










app.listen(PORT, () => {
    console.log(`API Server now on port ${PORT}!`);
  });