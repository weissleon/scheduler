import {
  fetchJson,
  METHOD_GET,
  METHOD_PATCH,
  METHOD_POST,
} from "../api/NetworkUtil";
import jwt from "jsonwebtoken";

// TODO: createUser function must be implemented!
export type UserPriv = UserPub & { email: string };

export type UserPub = {
  id: string;
  name: string;
  schedules: { id: string; privacyLv: number; filter: string[] }[];
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

export async function updateUser(id: string, change: any) {
  const result = await fetch(API_URL_BASE, {
    method: METHOD_PATCH,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(change),
  });
  return result;
}

export async function getUserNameById(id: string) {
  const res = (await fetchJson(API_URL_BASE + `/${id}`, {
    method: METHOD_GET,
  })) as UserPriv;
  return res.name;
}

export function getUserIdFromToken(token: string) {
  if (!token) return null;
  const { id } = jwt.decode(token) as { id: string };

  return id;
}
