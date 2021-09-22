import { generateAccessToken, generateRefreshToken } from "@util/api/TokenAPI";
import { UserPriv } from "@util/app/UserManager";
import { getAllUsers } from "./UserHandler";

export async function authenticateUser(email: string, password: string) {
  const user = (await getAllUsers())?.filter(
    (user) =>
      user.email == email &&
      (user as UserPriv & { password: string }).password == password
  );
  if (user && (user?.length as number) > 0)
    return {
      accessToken: generateAccessToken(user[0].id),
      refreshToken: generateRefreshToken(user[0].id),
    };
  else return null;
}
