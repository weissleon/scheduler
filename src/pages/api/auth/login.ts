import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@models/user";
import mongoose from "mongoose";
import { connectToDatabase } from "@util/api/DatabaseManager";
import {
  ACCESS_TOKEN_AGE,
  generateAccessToken,
  generateRefreshToken,
  REFRESH_TOKEN_AGE,
} from "@util/api/TokenAPI";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    // If invalid arguments are passed, return error.
    if (!email || !password) return res.status(400).end("Invalid input");
    // If database is not connected, connect to the database first.
    if (mongoose.connection.readyState !== 2) await connectToDatabase();
    // Check if the user credentials is valid.
    const user = await User.findOne({ email, password });
    // If the user credentials is invalid, return error.
    if (!user) return res.status(400).json("Invalid email or password");

    // Generate tokens.
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Send refreshToken and accessToken as cookie.
    res.setHeader("Set-Cookie", [
      cookie.serialize("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        maxAge: REFRESH_TOKEN_AGE,
      }),
      cookie.serialize("accessToken", accessToken, {
        httpOnly: true,
        path: "/",
        maxAge: ACCESS_TOKEN_AGE,
      }),
    ]);

    return res.status(200).end("Successful!");
  }
}
