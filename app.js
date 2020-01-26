const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

const playstore = require('./playstore.js');

app.get('/app', (req, res) => {
  // ALL OUR CODE HERE
  const { sort, genres= ""} = req.query;

  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of rating or app');
    }
  }

  let results = [...playstore]

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      
    });
  }

  if (genres) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      return res
        .status(400)
        .send('Genres must be Action, Puzzle, Strategy, Casual, Arcade, or Card.');
    }
  }

  if (genres) {
      results = results.filter(value => value.Genres.toLowerCase() === genres.toLowerCase())
  }

    
        
  res.json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});