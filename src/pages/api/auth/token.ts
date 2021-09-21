import { User } from "@models/user";
import {
  decodeToken,
  generateAccessToken,
  TOKEN_TYPE,
  verifyToken,
} from "@util/api/TokenManager";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return res.json({ ok: false });

  const { action } = req.body;

  if (action == "getNewAccessToken")
    return issueNewAccessToken(res, refreshToken);

  //   Check if the refreshToken n the cokie is valid.
  let { isValid, payload } = verifyToken(refreshToken, TOKEN_TYPE.REFRESH);

  //   Check if the refreshToken is registered in the database.
  const user = await User.findById(payload?.id);
  const index = user?.refreshTokens.indexOf(refreshToken) as number;

  //   If it is not registered in the database, revoke the local refreshToken.
  if (index < 0) {
    res.setHeader(
      "Set-Cookie",
      `refresh_token=${refreshToken};httpOnly;Secure;Path=/;Max-Age=0`
    );
    isValid = false;
    payload = null;
  }
  // If the refreshToken is expired, delete it from the database.
  if (!isValid) {
    user?.refreshTokens.splice(index, 1);
    await user?.save();
  }
  return res.json({ ok: isValid, id: payload?.id });
}

function issueNewAccessToken(res: NextApiResponse, refreshToken: string) {
  const id = decodeToken(refreshToken);
  const newToken = generateAccessToken(id as string);
  res.json({ ok: true, token: newToken });
}
