import { Router } from "express";
import { isAuth, isUnAuth } from "./_functions";
import db from "../database/database";
import "moment-duration-format";

const router = Router();

router.get("/", isAuth, async (req, res) => {
  let animeList = db.getAll("anime");
  let search = "";

  if (req._parsedOriginalUrl.query) {
    let query = req._parsedOriginalUrl.query.replace("q=", "").replace(/\+/g, " ");
    let searchFilter = animeList.filter((a) => Object.values(a.info.title).join(" | ").toLowerCase().includes(query.toLowerCase()));
    search = Cards.Anime(searchFilter || null, req);
  } else search = "";

  res.render("pages/search", {
    search: search,
  });
})

module.exports = router;