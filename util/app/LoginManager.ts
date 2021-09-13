import {
  ACK_CODE,
  fetchJson,
  METHOD_DELETE,
  METHOD_POST,
} from "@util/api/NetworkUtil";
import { AuthNBundle } from "./AuthenticationManager";

const URL_AUTHN = `/api/auth/authenticate`;

export async function login(authNBundle: AuthNBundle) {
  const response = await fetchJson(URL_AUTHN, {
    method: METHOD_POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authNBundle),
  });

  if (response.ack == ACK_CODE.APPROVED) return response.accessToken;
  else return null;

  // 1. Send to the API for authentication
  // 2. If the user exists and valid, you'll receive the accessToken.
  // 3. return the access token.
}
export async function logout() {
  const res = await fetchJson(URL_AUTHN, { method: METHOD_DELETE });
  return true;
  // 1. Request API for refresh_token deletion
  // 2. !! I do not know if I should delete the access token here or directly from the App.tsx
}
