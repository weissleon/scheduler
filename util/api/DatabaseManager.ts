import mongoose from "mongoose";
// Variables

// This function connects to the database and returns the db object if connected.
// returns null if failed.
// !! TEMPORARY IMPLEMENTATION !!
export async function connectToDatabase() {
  const conn = await mongoose.connect(process.env.DB_MONGODB_URL as string);
  return conn;
}

export async function checkDbConnection() {
  return mongoose.connection.readyState == 2;
}
