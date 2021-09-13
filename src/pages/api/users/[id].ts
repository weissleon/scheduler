// * IMPORTS
import { deleteUser, getUser, patchUser } from "@util/api/UserHandler";
import { isDatabaseOnline } from "@util/api/DatabaseManager";
import {
  METHOD_POST,
  METHOD_GET,
  METHOD_DELETE,
  METHOD_PATCH,
} from "@util/api/NetworkUtil";
import type { NextApiRequest, NextApiResponse } from "next";

// * VARIABLES
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
