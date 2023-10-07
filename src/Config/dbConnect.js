import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluester0.hde5qpu.mongodb.net/`)

const db = mongoose.connection;

export default db;