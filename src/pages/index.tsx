import { getSchedules, Schedule } from "@util/ScheduleManager";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  useEffect(() => {
    (async () => {
      setSchedules(await getSchedules());
    })();

    return () => {};
  }, []);

  return (
    <main>
      {schedules.length > 0 &&
        schedules.map((schedule) => {
          return (
            <div className={"m-4 shadow-md px-4 py-2 rounded-lg"}>
              <p>{schedule.id}</p>
              <p>{schedule.status}</p>
              <p>{schedule.creator}</p>
              <p>
                {schedule.participants.length > 0 &&
                  schedule.participants.reduce((prev, cur) => {
                    return `${prev}, ${cur}`;
                  })}
              </p>
              <p>{schedule.title}</p>
              <p>{schedule.detail}</p>
            </div>
          );
        })}
    </main>
  );
};

export default Home;
