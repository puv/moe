import { Router } from "express";
import { isAuth, isUnAuth } from "./_functions";
import db from "../database/database";
import "moment-duration-format";

const router = Router();

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