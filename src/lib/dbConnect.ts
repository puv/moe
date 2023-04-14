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
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI!).then(mongoose => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect