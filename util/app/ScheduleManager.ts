import jwt from "jsonwebtoken";
import {
  fetchJson,
  METHOD_GET,
  METHOD_PATCH,
  METHOD_POST,
} from "@util/api/NetworkUtil";

const API_URL_BASE = "/api/schedules";

export type Schedule = {
  id: string;
  status: ScheduleStatus;
  creatorId: string;
  participants: { id: string; status: number }[];
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

export async function getAllSchedules() {
  const schedules = await fetchJson(API_URL_BASE, { method: METHOD_GET });
  return schedules;
}

export async function getScheduleById(token: string) {
  // Guard Statement
  if (!token) return null;
  const { id } = jwt.decode(token) as { id: string };
  const schedules = (await getAllSchedules()) as Schedule[];
  const filteredSchedule = schedules.filter((schedule) => {
    let hasMatch = false;
    schedule.participants.some((participant) => {
      if (participant.id == id) {
        hasMatch = true;
        return true;
      } else return false;
    });
    return hasMatch;
  });
  return filteredSchedule;
}

export async function createSchedule(schedule: Schedule) {
  const res = await fetchJson(API_URL_BASE, {
    method: METHOD_POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });

  return res;
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

export async function updateParticipantStatus(id: string, change: any) {
  const result = await modifySchedule(id, change);
  return result;
}

export function checkParticipantStatus(
  schedule: Schedule,
  participantId: string
) {
  if (!schedule) return null;
  if (schedule) {
    const index = schedule.participants.findIndex(
      (participant) => participant.id === participantId
    );
    return schedule.participants[index].status;
  }
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

export function isScheduleOwner(token: string, schedule: Schedule) {
  if (!token) return null;
  const { id } = jwt.decode(token) as { id: string };
  if (schedule.creatorId === id) return true;
  else return false;
}

export function scheduleStatusToString(status: ScheduleStatus) {
  let statusString = "";
  switch (status) {
    case ScheduleStatus.CANCELED:
      statusString = "CANCELED";
      break;
    case ScheduleStatus.CONFIRMED:
      statusString = "CONFIRMED";
      break;
    case ScheduleStatus.DECLINED:
      statusString = "DECLINED";
      break;
    case ScheduleStatus.DRAFTED:
      statusString = "DRAFTED";
      break;
    case ScheduleStatus.PENDING:
      statusString = "PENDING";
      break;
    case ScheduleStatus.REVOKED:
      statusString = "REVOKED";
      break;
    default:
      statusString = "INVALID STATUS CODE";
      break;
  }
  return statusString;
}
