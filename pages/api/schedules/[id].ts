import { DB_BASE_URL, isDatabaseOnline } from "@util/DatabaseManager";
import { METHOD_DELETE, METHOD_GET, METHOD_PATCH } from "@util/NetworkUtil";
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

  switch (req.method) {
    case METHOD_GET:
      const schedules = await getSchedule(req.query.id as string);
      res.status(200).json(schedules);
      break;
    case METHOD_PATCH:
      const result = await updateSchedule(req.query.id as string);
      res.status(200).json(result);
      break;
    case METHOD_DELETE:
      const response = await deleteSchedule(req.query.id as string);
      res.status(200).json(response);
      break;
    default:
      res.status(401).json({ message: MSG_REQ_TYPE_ERR });
      break;
  }
}

async function getSchedule(id: string) {
  const isDBConnected = await isDatabaseOnline();

  if (isDBConnected) {
    const result = await (
      await fetch(DB_URL_SCHEDULES, {
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

async function updateSchedule(id: string) {
  // !! DUMMY DATA !!
  const payload = {
    creator: "Denis Cho",
  };

  const result = await fetch(DB_URL_SCHEDULES + `/${id}`, {
    method: METHOD_PATCH,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
