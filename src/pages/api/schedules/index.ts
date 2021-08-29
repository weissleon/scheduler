// * IMPORTS
import { DB_BASE_URL, isDatabaseOnline } from "@util/DatabaseManager";
import { METHOD_POST, fetchJson, METHOD_GET } from "@util/NetworkUtil";
import { Schedule, ScheduleStatus } from "@util/ScheduleManager";
import ObjectID from "bson-objectid";
import type { NextApiRequest, NextApiResponse } from "next";

// * VARIABLES
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
      result = await getAllSchedules();
      break;
    case METHOD_POST:
      // !! DUMMY DATA !!
      const schedule: Schedule = {
        creator: "Grace Yeon",
        id: new ObjectID(Date.now()).id,
        time: {
          start: Date.now().valueOf() + 10000,
          end: Date.now().valueOf() + 15000,
        },
        title: "슬기로운 의사생활 보기",
        detail: "집에서 옹기종기 모여 슬의 보기",
        participants: ["Grace Yeon", "Denis Cho", "Dana Cho"],
        status: ScheduleStatus.PENDING,
        ts: Date.now().valueOf(),
      };
      result = await postSchedule(schedule);
      break;
    default:
      return res.status(400).json({ message: MSG_REQ_TYPE_ERR });
  }
  return res.status(200).json(result);
}

async function getAllSchedules(): Promise<Schedule[] | null> {
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

// TODO Implementation not complete
async function postSchedule(newSchedule: Schedule) {
  const isDBConnected = await isDatabaseOnline();

  // Initialize likes property
  newSchedule["likes"] = [];

  if (isDBConnected) {
    const result = await fetch(DB_URL_SCHEDULES, {
      method: METHOD_POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSchedule),
    });
    return result.body;
  }
}
