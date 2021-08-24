// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const DB_URL_BASE = "http://localhost:3001";
const DB_URL_SCHEDULES = DB_URL_BASE + "/schedules";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const schedules = await getAllSchedules();
  res.status(200).json(schedules);
}

async function getAllSchedules() {
  const result = await (
    await fetch(DB_URL_SCHEDULES, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  return result;
}
