import { User } from "@models/user";
import { decodeToken } from "@util/api/TokenManager";
import { NextApiRequest, NextApiResponse } from "next";

const MSG_LOGOUT_SUCCESSFUL = "Logout Successful";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { refreshToken } = req.cookies;

  // If invalid arguments are passed, return error.
  if (!refreshToken) return res.status(400).json({ ok: false });

  const id = decodeToken(refreshToken);

  const user = await User.findById(id);
  const index = user?.refreshTokens.indexOf(refreshToken) as number;

  if (index > -1) {
    user?.refreshTokens.splice(index, 1);
    await user?.save();
  }
  // Send refreshToken as cookie.
  res.setHeader(
    "Set-Cookie",
    `refreshToken=${refreshToken};httpOnly;Secure;Path=/;Max-Age=0`
  );

  // Send accessToken as a response.
  res.status(200).json({ ok: true });
}
