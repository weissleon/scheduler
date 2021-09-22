import {
  ACCESS_TOKEN_AGE,
  decodeToken,
  REFRESH_TOKEN_AGE,
} from "@util/api/TokenAPI";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const MSG_LOGOUT_SUCCESSFUL = "Logout Successful";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { refreshToken } = req.cookies;

  // If invalid arguments are passed, return error.
  if (!refreshToken) return res.status(400).json({ ok: false });

  const id = decodeToken(refreshToken);
  //* This part is disabled temporarily and is pending.
  // const user = await User.findById(id);
  // const index = user?.refreshTokens.indexOf(refreshToken) as number;

  // if (index > -1) {
  //   user?.refreshTokens.splice(index, 1);
  //   await user?.save();
  // }

  // Expire  refreshToken and accessToken as cookie.
  res.setHeader("Set-Cookie", [
    cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    }),
    cookie.serialize("accessToken", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    }),
  ]);

  // Send accessToken as a response.
  res.status(200).json({ ok: true });
}
