// Imports
const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const data = require('./videos.json');
const funky = require('./src/videos');

// Set template machines
app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));

// Navigation föll
function index(req, res) {
  const dataJson = data;
  const { videos, categories } = dataJson;
  const mapped = categories.map((category) => {
    // viljum finna hvaða video eru í hverju category
    const mapped = category.videos.map((categoryVideoId) => {
      const video = videos.find((video) => video.id === categoryVideoId);
      // console.log(categoryVideoId, video);
      if (!video) {
        // TODO hvað gerum við ef finnst ekki?
        res.status(404).send('404 Villa við að sækja gögn');
      }
      return video;
    });

    return {
      catTitle: category.title,
      videos: mapped,
    };
  });

  res.render('./index', {
    funky,
    categories: mapped,
    title: 'Fræðslumyndbandaleigan',
  });
}

function video(req, res) {
  const dataJson = data;
  console.log(req.params);
  const videoId = parseInt(req.params.id);

  // TODO, er video til? ef svo , senda í video ejs template
  const { videos } = dataJson;
  // videos.find....
  const video = videos.find((video) => video.id === videoId);
  // Annars, senda í 404 meðhöndlun
  if (!video) {
    res.status(404).send('404 myndband ekki til');
  }

  res.render('./video', {
    videoId,
    videos,
    video,
    title: `${video.title}`,
  });
}

// Navigation
app.get('/', index); // Einhver biður um http://localhost:3000/ => svarar með því sem kemur úr index
app.get('/:id', video); // Einhver biður um http://localhost:3000/id =>

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
