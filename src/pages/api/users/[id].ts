// * IMPORTS
import { DB_BASE_URL, isDatabaseOnline } from "@util/DatabaseManager";
import {
  METHOD_POST,
  fetchJson,
  METHOD_GET,
  METHOD_DELETE,
  METHOD_PATCH,
} from "@util/NetworkUtil";
import { UserPriv } from "@util/UserManager";
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
      result = await getUser(req.query.id as string);
      break;
    case METHOD_PATCH:
      result = await patchUser(req.query.id as string, req.body);
      break;
    case METHOD_DELETE:
      result = await deleteUser(req.query.id as string);
      break;
    case METHOD_POST:
    default:
      return res.status(400).json({ message: MSG_REQ_TYPE_ERR });
  }
  return res.status(200).json(result);
}

async function getUser(id: string): Promise<UserPriv[] | null> {
  const isDBConnected = await isDatabaseOnline();

  if (isDBConnected) {
    const response = await fetchJson(DB_URL_USERS + `/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } else {
    return null;
  }
}

async function patchUser(id: string, change: any) {
  const isDBConnected = await isDatabaseOnline();

  //   Update ts.
  change["ts"] = Date.now();

  if (isDBConnected) {
    const result = await fetchJson(DB_URL_USERS + `/${id}`, {
      method: METHOD_PATCH,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(change),
    });
    return result;
  }
}

async function deleteUser(id: string) {
  const isDBConnected = await isDatabaseOnline();

  if (isDBConnected) {
    const result = await fetchJson(DB_URL_USERS + `/${id}`, {
      method: METHOD_DELETE,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  }
}
