import { NextPage } from "next";
import SideBar from "@components/dashboard/common/SideBar";
import AppBar from "@components/dashboard/common/AppBar";

const NewSchedule: NextPage = () => {
  return (
    <div
      className="grid w-screen grid-cols-6"
      style={{ gridTemplateRows: "56px 1fr" }}
    >
      <SideBar className="col-start-1 col-end-2 row-start-1 row-end-3" />
      <section className="col-start-2 col-end-7 row-start-1 row-end-2">
        <AppBar />
      </section>
      <main className="col-start-2 col-end-7 row-start-2 row-end-3">
        This is main
      </main>
    </div>
  );
};

export default NewSchedule;
