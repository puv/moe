import Router from "express";
import { isAuth, isUnAuth } from "./_functions";

const router = Router();

router.get("/", isAuth, async (req, res) => {
  let animeList = db.getAll("anime");

  if (req._parsedOriginalUrl.query) {
    query = req._parsedOriginalUrl.query.replace("q=", "").replace(/\+/g, " ");
    searchFilter = animeList.filter((a) => Object.values(a.info.title).join(" | ").toLowerCase().includes(query.toLowerCase()));
    search = Cards.Anime(searchFilter || null, req);
  } else search = "";

  res.render("pages/search", {
    search: search,
  });
})

module.exports = router;