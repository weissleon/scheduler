// * IMPORTS
import { DB_BASE_URL, isDatabaseOnline } from "@util/DatabaseManager";
import { METHOD_POST, fetchJson, METHOD_GET } from "@util/NetworkUtil";
import { UserPriv } from "@util/UserManager";
import ObjectID from "bson-objectid";
import type { NextApiRequest, NextApiResponse } from "next";

// * VARIABLES
const DB_URL_USERS = DB_BASE_URL + "/users";
const MSG_DB_ERR = "DB offline.";
const MSG_REQ_TYPE_ERR = "Invalid Request Type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the database is online.
  const ack = await isDatabaseOnline();
  if (!ack) return res.status(404).json({ message: MSG_DB_ERR });

  let result = null;
  switch (req.method) {
    case METHOD_GET:
      result = await getAllUsers();
      break;
    case METHOD_POST:
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      result = await createUser(newUser);
      break;
    default:
      return res.status(400).json({ message: MSG_REQ_TYPE_ERR });
  }
  return res.status(200).json(result);
}

async function getAllUsers(): Promise<UserPriv[] | null> {
  const isDBConnected = await isDatabaseOnline();

  if (isDBConnected) {
    const response = await fetchJson(DB_URL_USERS, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } else {
    return null;
  }
}

// TODO Implementation not complete
async function createUser(newUser: any) {
  const isDBConnected = await isDatabaseOnline();

  const payload = {
    id: new ObjectID(Date.now()),
    ...newUser,
    ts: Date.now(),
  };

  if (isDBConnected) {
    const result = await fetchJson(DB_URL_USERS, {
      method: METHOD_POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return result;
  }
}
