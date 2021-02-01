const express = require('express');
const router = express.Router();
const data = require('../videos.json');

// Navigation föll
function index(req, res, next) {
  const dataJson = data;
  const { videos, categories } = dataJson;
  const mapped = categories.map((category) => {
    // viljum finna hvaða video eru í hverju category
    const mapped = category.videos
      .map((categoryVideoId) => {
        const video = videos.find((video) => video.id === categoryVideoId);
        // console.log(categoryVideoId, video);
        if (!video) {
          // TODO hvað gerum við ef finnst ekki?
          //next();
          return null;
        }
        return video;
      })
      .filter(Boolean);

    return {
      catTitle: category.title,
      videos: mapped,
    };
  });

  res.render(
    './index',
    {
      categories: mapped,
      title: 'Fræðslumyndbandaleigan',
      footer: 'Fræðslumyndbandaleigan',
    },
    (err, html) => {
      // Ef villa kemur upp í EJS templ
      if (err) {
        return next(err);
      } else {
        res.send(html);
      }
    }
  );
}

function video(req, res, next) {
  const dataJson = data;
  console.log(req.params);
  const videoId = parseInt(req.params.id);

  // TODO, er video til? ef svo , senda í video ejs template
  const { videos } = dataJson;
  // videos.find....
  const video = videos.find((video) => video.id === videoId);
  // Annars, senda í 404 meðhöndlun
  if (!video) {
    return next();
  }

  res.render('./video', {
    videoId,
    videos,
    video,
    title: `${video.title}`,
    footer: 'Fræðslumyndbandaleigan',
  });
}

router.get('/', index);
router.get('/:id', video);

module.exports = router;
