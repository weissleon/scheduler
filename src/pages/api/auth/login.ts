import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { User } from "@models/user";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).end("Invalid input");
  if (mongoose.connection.readyState !== 2)
    await mongoose.connect(process.env.DB_MONGODB_URL as string);

  const user = await User.findOne({ email, password });
  if (user) return res.status(200).json({ msg: "Successful" });
  if (!user) return res.status(401).json({ msg: "Failed" });
  // // Set refresh token as a header.
  // res.setHeader(
  //     "Set-Cookie",
  //     `token_refresh=${refreshToken};httpOnly;Secure;Path=/api/auth/refresh_token;Max-Age=${
  //       60 * 60 * 24 * 7
  //     }`
  //   );

  // Set refresh token as a header.
  res.setHeader(
    "Set-Cookie",
    `hello=world;httpOnly;Secure;Path=/;Max-Age=${60 * 60 * 24 * 7}`
  );

  res.end("Cookie added");
}
