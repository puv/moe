import { Router } from "express";
import { isAuth, isUnAuth } from "./_functions";
import db from "../database/database";
import moment from "moment";
import "moment-duration-format";

const router = Router();

router.get("/:id", isAuth, async (req, res) => {
  try {
    let anime = await db.getAnimeById(req.params.id);
    if (anime) {
      let views = anime.extra.views || 0;
      let updatedAt = anime.extra.updatedAt || 0;

      if (Math.floor((Date.now() - updatedAt) / 1000 / 60) > 1)
        anime.info = await db.getAnime(req.params.id);
      const animes = db.getDb().db("animes").collection("animes");
      await animes.updateOne({
        id: parseInt(req.params.id)
      }, {
        $set: {
          info: {
            title: anime.info["title"] || null,
            format: anime.info["format"] || null,
            status: anime.info["status"] || null,
            episodes: anime.info["episodes"] || null,
            description: anime.info["description"] || null,
            season: anime.info["season"] || null,
            startDate: anime.info["startDate"] || null,
            endDate: anime.info["endDate"] || null,
            duration: anime.info["duration"] || null,
            trailer: anime.info["trailer"] || null,
            coverImage: anime.info["coverImage"] || null,
            bannerImage: anime.info["bannerImage"] || null,
            genres: anime.info["genres"] || null,
            averageScore: anime.info["averageScore"] || null,
            meanScore: anime.info["meanScore"] || null,
            favourites: anime.info["favourites"] || null,
            popularity: anime.info["popularity"] || null,
            trending: anime.info["trending"] || null,
            tags: anime.info["tags"] || null,
            isFavourite: anime.info["isFavourite"] || null,
            isAdult: anime.info["isAdult"] || null,
          },
          extra: {
            views: ++views,
            updatedAt: Date.now(),
          },
        },
      });

      let epCode: string = "";
      db.saveAnime(anime.id, anime.info);
      let eps = [];


      if (anime.info.streamingEpisodes && anime.info.streamingEpisodes.length > 0) {
        let episodes = anime.info.streamingEpisodes.reverse()
        console.log("INFO Eps: " + episodes.length);
        for (let i = 0; i <= episodes.length - 1; i++) {
          let ep = episodes[i];
          let num = i + 1;
          eps.push({
            i: i,
            num: num,
            title: ep.title.replace(/.*\- /, "")
          })
        }
      } else {
        for (let i = 0; i <= anime.episodes.length - 1; i++) {
          let ep = anime.episodes[i];
          if (anime.info.episodes && (anime.info.episodes || 0) >= i + 1)
            eps.push({
              i: ep.ep,
              num: ep.ep,
              title: "Episode " + ep.ep
            })
        }
        console.log("Eps: " + anime.info.episodes)
        console.log("DB Eps: " + anime.episodes.length);
      }

      let synopsis: Object = {
        blur: req.user!.settings.synopsis ? true : false,
        text: anime.info.description
      }

      console.log(req.user!.animes)
      let uStatus = Object.keys(req.user!.animes).includes(anime.id) ? Object.values(req.user!.animes[anime.id]) : false;
      console.log(uStatus)

      let animeList = db.getAll("anime");

      let nextAirString = anime.info.nextAiringEpisode ? moment
        .duration(anime.info.nextAiringEpisode.timeUntilAiring * 1000)
        .format("[Next episode will air in] D [days], H [hours], m [minutes], s [seconds].") : "";

      let related = [];
      if (anime.info.relations)
        for (let rel of anime.info.relations.filter((r: { type: string; id: string; }) => r.type == 'ANIME' && r.id != ""))
          related.push({
            id: rel.id,
            title: Object.values(rel.title)[0] || "Title not found"
          })

      res.render("pages/a", {
        image: anime.info.coverImage.large,
        upTitle: Object.values(anime.info.title)[0],
        nTitle: anime.info.title.native,
        synopsis: synopsis,
        epCode: eps,
        eps: JSON.stringify(anime.episodes),
        related: related || null,
        username: req.user!.username,
        avatar: req.user!.avatar,
        nextAir: nextAirString || "",
        uStatus: uStatus,
        totalAnimes: animeList.length,
      });
    } else {
      res.redirect("../404");
    }
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;