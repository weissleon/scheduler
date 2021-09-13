import {
  fetchJson,
  METHOD_PATCH,
  METHOD_POST,
  METHOD_DELETE,
} from "@util/api/NetworkUtil";
import { UserPriv } from "@util/app/UserManager";
import ObjectID from "bson-objectid";
import { DB_BASE_URL, isDatabaseOnline } from "./DatabaseManager";

// * VARIABLES
const DB_URL_USERS = DB_BASE_URL + "/users";

// TODO Implementation not complete
export async function createUser(newUser: any) {
  const isDBConnected = await isDatabaseOnline();

  const payload = {
    id: new ObjectID(Date.now()),
    ...newUser,
    ts: Date.now(),
  };

  if (isDBConnected) {
    const result = await fetchJson(DB_URL_USERS, {
      method: METHOD_POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return result;
  }
}

export async function getAllUsers(): Promise<UserPriv[] | null> {
  const isDBConnected = await isDatabaseOnline();

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
  const isDBConnected = await isDatabaseOnline();

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
  const isDBConnected = await isDatabaseOnline();

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
  const isDBConnected = await isDatabaseOnline();

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
