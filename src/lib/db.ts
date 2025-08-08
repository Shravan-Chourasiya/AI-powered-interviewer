
import mongoose from 'mongoose'

type connectionObject = {
    isConnected?: number
}
const connection: connectionObject={};

async function dbConn(): Promise<void> {
    if (connection.isConnected) return console.log('DB Connection already exists !!')
    try {
        const db=await mongoose.connect(process.env.MONGODB_URI || '')
        connection.isConnected=db.connections[0].readyState;
        console.log('DB Connection Successful !!');

    } catch (error) {
        console.error(error)
        console.log("DB connection Failed !! ",error);
        process.exit(1)
    }
}
export default dbConn;