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
            <div style={{ background: "#ccc" }}>
              <p>{schedule.id}</p>
              <p>{schedule.status}</p>
              <p>{schedule.creator}</p>
              <p>{schedule.participants}</p>
              <p>{schedule.title}</p>
              <p>{schedule.detail}</p>
            </div>
          );
        })}
    </main>
  );
};

export default Home;
