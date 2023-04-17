import mongoose, { ConnectOptions } from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URI

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable'
    )
}
let cached: any = {
    conn: null,
    promise: null
}

async function dbConnect() {
    console.log("Connecting to database...");

    if (cached.conn) {
        console.log("Using cached connection");
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI!).then(mongoose => {
            return mongoose
        })
    }
    console.log("Waiting for connection...");
    cached.conn = await cached.promise

    console.log("Connected to database");

    // delete cached.conn.models["Staff"]
    // delete cached.conn.models["Anime"]
    // delete cached.conn.models["Manga"]
    // delete cached.conn.models["Character"]
    // delete cached.conn.models["User"]
    // delete cached.conn.models["Post"]

    // console.log("Deleted models");

    return cached.conn
}

export default dbConnect