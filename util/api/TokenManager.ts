import jwt from "jsonwebtoken";
import { UserPub } from "@util/app/UserManager";

export enum TOKEN_TYPE {
  ACCESS,
  REFRESH,
}

const ACCESS_TOKEN_SECRET = "AKLADENIA";
const REFRESH_TOKEN_SECRET = "WEISSLEON";

const ACCESS_TOKEN_EXP = 3 * 60;
const REFRESH_TOKEN_EXP = 60 * 60 * 24 * 7 * 2; // 2 weeks

export function generateAccessToken(id: string): string {
  const payload = { id: id };
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXP,
  });
  return token;
}

export function verifyToken(accessToken: string, tokenType: TOKEN_TYPE) {
  const key =
    tokenType == TOKEN_TYPE.ACCESS ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
  try {
    const decodedToken = jwt.verify(accessToken, key);
    return {
      isValid: true,
      payload: { id: (decodedToken as { id: string }).id },
    };
  } catch (error) {
    return { isValid: false, payload: null };
  }
}

export function generateRefreshToken(id: string): string {
  const payload = { id: id };
  const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXP,
  });
  return token;
}
