const router = require('express').Router();
const { isAuth, isUnAuth } = require('./_Functions.js');

router.get("/", isAuth, async (req, res) => {
    let animeList = db.getAll("anime");

  let airingList = animeList.filter(a => a.info.status == "RELEASING");

  let air = Cards.Anime(airingList.slice(0, 6) || null, req);
  console.log(air[0])
  res.render("pages/home", {
    latest: air,
    username: req.user.username,
    avatar: req.user.avatar,
    totalAnimes: animeList.length,
  });
})

module.exports = router;