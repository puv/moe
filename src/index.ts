import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import db from "./database/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

db.then(async () => {
    console.log('Connected to MongoDB');
}).catch((err: any) => {
    console.log(err);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("trust proxy", true);

// app.use(flash());

app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./routes/_routing"))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});