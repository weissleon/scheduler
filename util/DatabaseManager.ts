import { METHOD_GET } from "@util/NetworkUtil";

// Variables
export const DB_BASE_URL = "http://localhost:3001";

// This function connects to the database and returns the db object if connected.
// returns null if failed.
// !! TEMPORARY IMPLEMENTATION !!
export async function connectToDatabase() {
  let ack = await isDatabaseOnline();
  let db = null; // ! This will be implemented in the future.
  return { ack, db };
}

export async function isDatabaseOnline() {
  let ack;
  try {
    let response = await fetch(DB_BASE_URL, { method: METHOD_GET });
    ack = true;
  } catch (error) {
    ack = false;
  }
  return ack;
}
