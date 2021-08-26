import { DB_BASE_URL, isDatabaseOnline } from "@util/DatabaseManager";
import { METHOD_POST, fetchJson, METHOD_GET } from "@util/NetworkUtil";
import type { NextApiRequest, NextApiResponse } from "next";

const DB_URL_SCHEDULES = DB_BASE_URL + "/schedules";
const MSG_DB_ERROR = "DB offline.";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the database is online.
  const ack = await isDatabaseOnline();
  if (!ack) return res.status(404).json({ message: MSG_DB_ERROR });

  switch (req.method) {
    case METHOD_GET:
      const schedules = await getAllSchedules();
      res.status(200).json(schedules);
      break;
    case METHOD_POST:
      const result = await createSchedule();
      res.status(200).json(result);
      break;
    default:
      break;
  }
}

async function getAllSchedules() {
  const isDBConnected = await isDatabaseOnline();

  if (isDBConnected) {
    const result = await fetchJson(DB_URL_SCHEDULES, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result;
  } else {
    return null;
  }
}

async function createSchedule() {
  const isDBConnected = await isDatabaseOnline();

  //   !!! DUMMY PAYLOAD !!!
  const payload = {
    creator: "Grace Yeon",
    id: Date.now().toString(),
  };

  if (isDBConnected) {
    const result = await fetch(DB_URL_SCHEDULES, {
      method: METHOD_POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return result.body;
  }
}
