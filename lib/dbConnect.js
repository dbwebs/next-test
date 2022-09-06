import mongoose from 'mongoose'


let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {

    try {

        await mongoose.connect(process.env.MONGO)
        console.log("Connected to mongoDB")

    } catch (error) {
        throw error;
    }

    //cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
    //return mongoose
    //})
}


export default dbConnect