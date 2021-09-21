import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@models/user";
import mongoose from "mongoose";
import { connectToDatabase } from "@util/api/DatabaseManager";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@util/api/TokenManager";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  // If invalid arguments are passed, return error.
  if (!email || !password) return res.status(400).end("Invalid input");

  // If database is not connected, connect to the database first.
  if (mongoose.connection.readyState !== 2) await connectToDatabase();

  // Check if the user credentials is valid.
  const user = await User.findOne({ email, password });

  // If the user credentials is invalid, return error.
  if (!user) return res.status(200).json({ accessToken: null });

  // Generate tokens.
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  user.refreshTokens.push(refreshToken);
  await user.save();
  // Send refreshToken as cookie.
  res.setHeader(
    "Set-Cookie",
    `refreshToken=${refreshToken};httpOnly;Secure;Path=/;Max-Age=${
      60 * 60 * 24 * 7
    }`
  );

  // Send accessToken as a response.
  res.status(200).json({ accessToken: accessToken });
}
