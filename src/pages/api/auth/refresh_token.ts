import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "@util/api/TokenAPI";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).end("Invalid input");

  const { id } = jwt.decode(refreshToken) as { id: string };
  const newToken = generateAccessToken(id);

  res.status(200).json({ accessToken: newToken });
};
