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

//write functions to create notes and retrieve notes here
function createNote(body, notesArray) {
  const newNote = body;
  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({notes: notesArray }, null, 2)
  );
  return newNote;
};

function validateNote(note){
  if (!note.title || typeof note.title !== 'string'){
    return false;
  }
  if (!note.text || typeof note.text !== 'string'){
    return false;
  }
  return true;
};

//establish api route
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
   // set id based on what the next index of the array will be
   req.body.id = notes.length.toString();

   // if any data in req.body is incorrect, send 400 error back
   if (!validateNote(req.body)) {
     res.status(400).send("The note is not properly formatted.");
   } else {
     const newNote = createNote(req.body, notes);
     res.json(newNote);
   }
 });

//establish route for html requests
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//start server
app.listen(PORT, () => {
  console.log(`API Server now on port ${PORT}!`);
});