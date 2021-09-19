// * IMPORTS
import { getAllUsers, createUser } from "@util/api/UserHandler";
import { checkDbConnection } from "@util/api/DatabaseManager";
import { METHOD_GET, METHOD_POST } from "@util/api/NetworkUtil";
import type { NextApiRequest, NextApiResponse } from "next";

// * VARIABLES
const MSG_DB_ERR = "DB offline.";
const MSG_REQ_TYPE_ERR = "Invalid Request Type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the database is online.
  const ack = await checkDbConnection();
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
