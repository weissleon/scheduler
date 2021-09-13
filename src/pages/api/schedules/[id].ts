import { DB_BASE_URL, isDatabaseOnline } from "@util/api/DatabaseManager";
import {
  METHOD_DELETE,
  METHOD_GET,
  METHOD_PATCH,
  METHOD_POST,
} from "@util/api/NetworkUtil";
import type { NextApiRequest, NextApiResponse } from "next";

// ! This is still being implemented, and thus highly discouraged.

const DB_URL_SCHEDULES = DB_BASE_URL + "/schedules";
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
      result = await getSchedule(req.query.id as string);
      break;
    case METHOD_PATCH:
      result = await patchSchedule(req.query.id as string, req.body);
      break;
    case METHOD_DELETE:
      result = await deleteSchedule(req.query.id as string);
      break;
    case METHOD_POST:
    default:
      res.status(401).json({ message: MSG_REQ_TYPE_ERR });
      return;
  }

  res.status(200).json(result);
}

async function getSchedule(id: string) {
  const isDBConnected = await isDatabaseOnline();

  if (isDBConnected) {
    const result = await (
      await fetch(DB_URL_SCHEDULES + `/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    return result;
  } else {
    return null;
  }
}

async function patchSchedule(id: string, change: any) {
  const result = await fetch(DB_URL_SCHEDULES + `/${id}`, {
    method: METHOD_PATCH,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(change),
  });

  return result.body;
}

async function deleteSchedule(id: string) {
  // !! DUMMY DATA !!

  const result = await fetch(DB_URL_SCHEDULES + `/${id}`, {
    method: METHOD_DELETE,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return result.body;
}
