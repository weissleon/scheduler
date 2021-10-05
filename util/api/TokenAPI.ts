import jwt from "jsonwebtoken";

export enum TOKEN_TYPE {
  ACCESS,
  REFRESH,
}

const ACCESS_TOKEN_SECRET = "AKLADENIA";
const REFRESH_TOKEN_SECRET = "WEISSLEON";

export const ACCESS_TOKEN_AGE = 3 * 60;
export const REFRESH_TOKEN_AGE = 60 * 60 * 24 * 7 * 2; // 2 weeks

export function generateAccessToken(id: string): string {
  const payload = { id: id };
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_AGE,
  });
  return token;
}

export function verifyToken(token: string, tokenType: TOKEN_TYPE) {
  const key =
    tokenType == TOKEN_TYPE.ACCESS ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
  try {
    const decodedToken = jwt.verify(token, key);
    return {
      isValid: true,
      payload: { id: (decodedToken as { id: string }).id },
    };
  } catch (error) {
    return { isValid: false, payload: null };
  }
}

export function decodeToken(token: string) {
  try {
    const decodedToken = jwt.decode(token);
    return (decodedToken as { id: string }).id;
  } catch (error) {
    return null;
  }
}

export function generateRefreshToken(id: string): string {
  const payload = { id: id };
  const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_AGE,
  });
  return token;
}
