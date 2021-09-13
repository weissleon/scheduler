// TODO IMPLEMENTATION

import { ACK_CODE, fetchJson, METHOD_GET } from "@util/api/NetworkUtil";

const URL_REFRESH_ACCESS = "/api/auth/refresh_access";
export type AuthNBundle = {
  email: string;
  password: string;
};

export async function verifyUser(data: AuthNBundle): Promise<boolean> {
  return false;
}

export async function getLogInStatus(): Promise<string | null> {
  const res = await fetchJson(URL_REFRESH_ACCESS, {
    method: METHOD_GET,
  });

  if (res.ack == ACK_CODE.APPROVED) return res.accessToken;
  else return null;
}
