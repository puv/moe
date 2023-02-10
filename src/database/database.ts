import mongoose, { Collection, ConnectOptions, Connection, Mongoose } from "mongoose";
import dotenv from "dotenv";
import { WithId } from "mongodb";

dotenv.config();

const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions;


let _db: any, _animeCOL: Collection, _userCOL: Collection, _animeList: any, _userList: any, _airingList: any;

const db = {
    init: async (callback: any) => {
        if (_db) {
            console.warn("Trying to init DB again!");
            return callback(null, _db);
        }
        console.log("Initializing Database");

        let instance: Mongoose = await mongoose.connect(process.env.DB_URI!, options);

        _db = instance.connection.db;
        console.log("Database Initialized");
        _animeCOL = _db.collection("animes");
        _userCOL = _db.collection("users");
        console.log("Collections Loaded");

        let _userFind = await _userCOL.find({});
        _userList = await _userFind.toArray();
        _userFind.close();

        let _animeFind = await _animeCOL.find({});

        _animeList = await _animeFind.toArray();
        _animeFind.close();
        console.log("Table ANIMES Loaded: " + _animeList.length + " results");
        //updateUsers();
        // await updateAiring();
        // _airingList = await ALAPI.getAiring();
        // console.log("AniCAST is Ready.");
        // updateAnimes();
        return callback(null, _db);

    },
    updateUsers: async () => {
        _userCOL = _db.collection("users");
        _userList = await _userCOL.find({}).toArray();
        console.log("Synced " + _userList.length + " users.");
    },

    /**
     * Syncs the user on the server with the user on the database.
     */
    syncUser: async (_id: string | Int16Array) => {
        let newInfo = await _userCOL.find({
            _id: _id
        }).toArray();
        _userList.filter((u: any) => u._id == _id)[0] = newInfo[0];
    },

    /**
     * Updates the animes on the server.
     */
    updateAnimes: async () => {
        setTimeout(async function () {
            _animeCOL = _db.collection("animes");
            _animeList = await _animeCOL.find({}).toArray();
            console.log("Synced " + _animeList.length + " animes.");
            updateAnimes();
            updateAiring();
        }, 30 * 60 * 1000);
    },

    /**
     * Returns a list of animes that are currently airing.
     * @returns {Array}
     */
    getAiring: () => {
        return _airingList;
    },

    /**
     * Updates the airing anime on the server.
     */
    updateAiring: async () => {
        for (let i = 0; i < _animeList.length; i++) {
            if (_animeList[i].info.status != "RELEASING") return;
            let info = await ALAPI.getAnime(_animeList[i].id);
            console.log("Updated anime: " + info.id);
            _animeList[i].info = info;
            if (info.status != "RELEASING") {
                await _animeCOL.updateOne({
                    id: info.id
                }, {
                    $set: {
                        "info.status": info.status
                    }
                }, function (err, res) {
                    if (err) console.log(err)
                });
            }
        }
    },

    /**
     * Gets the anime with the given id.
     */
    getAnimeById: async (id) => {
        let anime = await _animeList.filter((a) => a.id == id)[0]
        return anime;
    },

    /**
     * Gets the anime with the given id.
     */
    getUserById: async (_id) => {
        let user = await _userList.filter((u) => u._id == _id)[0]
        return user;
    },

    /**
     * Gets database if it has been initialized.
     */
    getDb: () => {
        assert.ok(_db, "Db has not been initialized. Please called init first.");
        return _db;
    },

    /**
     * Gets all users or animes from the database.
     * @param {string} arg("users" or "animes")
     */
    getAll: (arg) => {
        assert.ok(_db, "Db has not been initialized. Please called init first.");
        if (arg === "anime") return _animeList;
        if (arg === "users") return _userList;
        return null;
    },

    /**
     * Saves the given anime to server cache.
     */
    saveAnime: (id, info) => {
        _animeList.filter((a) => a.id == id)[0].info = info;
    }
}

export default db;

export { _db, _animeCOL, _userCOL, _animeList, _userList, _airingList };


// module.exports = mongoose.connect(process.env.DB_URI!, options);