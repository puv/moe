import { Router } from "express";
import { isAuth, isUnAuth } from "./_functions";
import moment from "moment";
import "moment-duration-format";

const router = Router();
import passport from "passport";
import db from "../database/database";


const initPass = require("../../passport-config.js");
initPass.init(
    passport,
    (email: String) => db.getAll("users").filter((u) => u.email === email)[0],
    (id: String) => db.getAll("users").filter((u) => u.id === id)[0]
);


router.get("/", isUnAuth, async (req, res) => {
    res.render("pages/auth", {
        reqURL: req._parsedOriginalUrl.path,
    });
})

router.post('/',
    passport.authenticate('local'),
    async (req, res) => {
        console.log(res)
        console.log(req.user)
        reqURL = req._parsedOriginalUrl.query ? req._parsedOriginalUrl.query.replace("href=", "") : "/";
        res.redirect(reqURL);
    });

router.put("/", isUnAuth, async (req, res) => {
    //if (req.body.invite != "") return res.render("register");
    try {
        const hashed = await bcrypt.hash(req.body.password, 10);
        const mongo = await db.getDb();
        var users = mongo.db("users");
        var user = {
            id: Date.now().toString(),
            username: req.body.username,
            avatar: "./assets/img/avatars/default" +
                (Math.floor(Math.random() * 6) + 1).toString() +
                ".png",
            email: req.body.email,
            password: hashed,
            animes: [],
            settings: {
                synopsis: true,
                images: true,
            },
        };
        users.collection("users").insertOne(user, function (err, res) {
            if (err) throw err;
        });
        db.updateUsers();
        res.redirect("/login");
    } catch (err) {
        console.log(err);
        res.redirect("/register");
    }
});

router.delete('/', isAuth, async (req, res) => {
    req.logout();
    res.redirect("/");
})

module.exports = router;