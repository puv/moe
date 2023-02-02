const router = require('express').Router();
const { isAuth, isUnAuth } = require('./_Functions.js');

router.get("/", isAuth, async (req, res) => {
    let animeList = db.getAll("anime");

  let anime = animeList[Math.floor(Math.random() * animeList.length)];
  let id = anime.id;


  res.send({
    id: id,
  });
})

module.exports = router;