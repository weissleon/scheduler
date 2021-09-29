import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const TICKET_SECRET = "AKLADENIA";
const EXP_TIME = 1 * 60 * 60 * 24;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.body;

  if (action == "CREATE") {
    const { inviterId, inviteeId } = req.body;
    const payload = {
      inviterId: inviterId,
      inviteeId: inviteeId,
    };
    const ticket = jwt.sign(payload, TICKET_SECRET, { expiresIn: EXP_TIME });
    return res.status(200).json({ ticket: ticket });
  }

  // TODO UNDER IMPLEMENTATION
  if (action == "USE") {
    const { ticket } = req.body;
    const payload = jwt.verify(ticket, TICKET_SECRET);
  }

  return res.status(401).end("Invalid request");
}
