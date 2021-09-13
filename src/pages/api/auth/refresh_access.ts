import {
  generateAccessToken,
  TOKEN_TYPE,
  verifyToken,
} from "@util/api/TokenManager";
import { ACK_CODE, METHOD_GET, METHOD_POST } from "@util/api/NetworkUtil";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case METHOD_GET:
      const { isValid, payload } = verifyToken(
        req.cookies.refresh_token,
        TOKEN_TYPE.REFRESH
      );
      if (isValid)
        return res.json({
          ack: ACK_CODE.APPROVED,
          accessToken: generateAccessToken(payload?.id as string),
        });
      else
        return res.json({
          ack: ACK_CODE.REJECTED,
          message: "Invalid Refresh Token",
        });
      break;
    case METHOD_POST:
    default:
      return res.json({
        ack: ACK_CODE.REJECTED,
        message: "Invalid Request Type",
      });
  }
}
