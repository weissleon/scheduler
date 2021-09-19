import {
  fetchJson,
  METHOD_PATCH,
  METHOD_POST,
  METHOD_DELETE,
} from "@util/api/NetworkUtil";
import { UserPriv } from "@util/app/UserManager";
import mongoose from "mongoose";
import { DB_BASE_URL, checkDbConnection } from "./DatabaseManager";

// * VARIABLES
const DB_URL_USERS = DB_BASE_URL + "/users";

// TODO Implementation not complete
export async function createUser(newUser: any) {
  await mongoose.connect(process.env.DB_URL_MONGO as string);
}

export async function getAllUsers(): Promise<UserPriv[] | null> {
  const isDBConnected = await checkDbConnection();

  if (isDBConnected) {
    const response = await fetchJson(DB_URL_USERS, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } else {
    return null;
  }
}

export async function getUser(id: string): Promise<UserPriv[] | null> {
  const isDBConnected = await checkDbConnection();

  if (isDBConnected) {
    const response = await fetchJson(DB_URL_USERS + `/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } else {
    return null;
  }
}

export async function patchUser(id: string, change: any) {
  const isDBConnected = await checkDbConnection();

  //   Update ts.
  change["ts"] = Date.now();

  if (isDBConnected) {
    const result = await fetchJson(DB_URL_USERS + `/${id}`, {
      method: METHOD_PATCH,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(change),
    });
    return result;
  }
}

export async function deleteUser(id: string) {
  const isDBConnected = await checkDbConnection();

  if (isDBConnected) {
    const result = await fetchJson(DB_URL_USERS + `/${id}`, {
      method: METHOD_DELETE,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  }
}

export async function IsUserExist(id: string): Promise<boolean> {
  const result = await getUser(id);
  if (result) return true;
  else return false;
}
