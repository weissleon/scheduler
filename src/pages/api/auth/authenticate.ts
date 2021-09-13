import { authenticateUser } from "@util/api/AuthNHandler";
import { METHOD_DELETE, METHOD_GET, METHOD_POST } from "@util/api/NetworkUtil";
import { NextApiRequest, NextApiResponse } from "next";

const REFRESH_TOKEN_COOKIE_PATH = "/api/auth/refresh_access";

const MSG_DELETE_SUCCESS = "Refresh Token Deleted";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case METHOD_POST:
      const tokens = await authenticateUser(req.body.email, req.body.password);
      if (tokens) {
        res.setHeader(
          "Set-Cookie",
          `refresh_token=${tokens.refreshToken};path=${REFRESH_TOKEN_COOKIE_PATH}`
        );
        return res.json({ ack: 1, accessToken: tokens.accessToken });
      } else return res.json({ ack: 0, message: "Invalid User" });
    case METHOD_DELETE:
      res.setHeader(
        "Set-Cookie",
        `refresh_token=deleted;path=${REFRESH_TOKEN_COOKIE_PATH};expires=Thu, 01 Jan 1970 00:00:00 GMT`
      );
      return res.json({ ack: 1, message: MSG_DELETE_SUCCESS });
    case METHOD_GET:

    default:
      return res.json({ message: "Invalid Request Type" });
  }
}
