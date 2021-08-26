import { METHOD_GET } from "@util/NetworkUtil";
export async function getSchedules() {
  const schedules = await (
    await fetch("/api/schedules", { method: METHOD_GET })
  ).json();

  return schedules;
}
