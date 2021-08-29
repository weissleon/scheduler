import {
  fetchJson,
  METHOD_GET,
  METHOD_PATCH,
  METHOD_POST,
} from "@util/NetworkUtil";

const API_URL_BASE = "/api/schedules";

export type Schedule = {
  id: string;
  status: ScheduleStatus;
  creator: string;
  participants: string[];
  likes?: string[];
  time: {
    start: number;
    end: number;
  };
  title: string;
  detail: string;
  ts: number;
};

export enum ScheduleStatus {
  PENDING = 1,
  CONFIRMED = 2,
  REVOKED = -3,
  CANCELED = -2,
  DECLINED = -1,
  DRAFTED = 0,
}

export async function getSchedules() {
  const schedules = await fetchJson(API_URL_BASE, { method: METHOD_GET });
  return schedules;
}

export async function createSchedule(schedule: Schedule) {
  const response = await fetchJson(API_URL_BASE, {
    method: METHOD_POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });

  return response;
}

export async function confirmSchedule(id: string) {
  const payload = {
    status: ScheduleStatus.CONFIRMED,
  };

  const result = await modifySchedule(id, payload);

  return result;
}

export async function declineSchedule(id: string) {
  const payload = {
    status: ScheduleStatus.DECLINED,
  };

  const result = await modifySchedule(id, payload);

  return result;
}

export async function cancelSchedule(id: string) {
  const payload = {
    status: ScheduleStatus.CANCELED,
  };

  const result = await modifySchedule(id, payload);

  return result;
}

export async function revokeSchedule(id: string) {
  const payload = {
    status: ScheduleStatus.REVOKED,
  };

  const result = await modifySchedule(id, payload);

  return result;
}

async function modifySchedule(id: string, change: any) {
  const result = await fetchJson(API_URL_BASE + `/${id}`, {
    method: METHOD_PATCH,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(change),
  });

  return result;
}
