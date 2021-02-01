// Imports
const express = require('express');
const app = express();
const port = 3000;
const utils = require('./src/utils');

// const funky = require('./src/videos');
const router = require('./src/videos');

// Set template machines
app.set('view engine', 'ejs');

// Local föll
app.locals = utils;

// Static files
app.use(express.static('./public'));

/*
  Þetta var fært inn í videos.js og sent til baka í router.

// Navigation
// app.get('/', index); // Einhver biður um http://localhost:3000/ => svarar með því sem kemur úr index
// app.get('/:id', video); // Einhver biður um http://localhost:3000/id =>
*/

app.use('/', router);

// Villumeðhöndlun

function notFoundHandler(req, res, next) {
  const title = 'Myndband fannst ekki';
  const subtitle = 'Myndbandið sem þú ert að leita að finnst ekki';
  res.status(404).render('templates/error.ejs', { title, subtitle });
}

function errorHandler(err, req, res, next) {
  console.log(err);
  const title = 'Villa kom upp';
  const subtitle = err.message;
  res.status(500).render('templates/error.ejs', { title, subtitle });
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
