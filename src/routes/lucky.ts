import { Router } from "express";
import { isAuth, isUnAuth } from "./_functions";
import db from "../database/database";
import "moment-duration-format";

const router = Router();

router.get("/", isAuth, async (req, res) => {
  let animeList = db.getAll("anime");

  let anime = animeList[Math.floor(Math.random() * animeList.length)];
  let id = anime.id;


  res.send({
    id: id,
  });
})

module.exports = router;