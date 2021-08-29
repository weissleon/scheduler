import { METHOD_POST } from "./NetworkUtil";

// TODO: createUser function must be implemented!
export type UserPriv = UserPub & { email: string };

export type UserPub = {
  id: string;
  name: string;
};

const API_URL_BASE = "/api/users";

type UserRegType = {
  name: string;
  email: string;
  password: string;
};
export async function createUser({ name, email, password }: UserRegType) {
  const payload = {
    name: name,
    email: email,
    password: password,
  };

  const result = await fetch(API_URL_BASE, {
    method: METHOD_POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return result;
}
