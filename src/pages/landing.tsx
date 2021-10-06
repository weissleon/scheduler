import { NextPage } from "next";
import Link from "next/link";
import ScheduleImage from "../../public/svg/first_block.svg";
import Image from "next/image";

const Landing: NextPage = () => {
  return (
    <main className="flex flex-col min-h-screen px-60 bg-red-50 ">
      {/* Appbar */}
      <div className="grid w-full grid-cols-3 h-28 bg-red-50">
        {/* LOGO */}
        <div className="flex items-center w-12 ">
          <Link href="/landing">
            <a className="font-extrabold">YACSOK</a>
          </Link>
        </div>
        {/* MENU */}
        <div className="flex items-center justify-evenly ">
          <a href="#" className="font-bold">
            Features
          </a>
          <Link href="/updates">
            <a className="font-bold">Updates</a>
          </Link>
          <a href="#" className="font-bold">
            Contacts
          </a>
        </div>
        {/* Login Buttons */}
        <div className="flex flex-row items-center gap-8 ml-auto">
          <Link href="/sign_in">
            <a>Log in</a>
          </Link>
          <Link href="/sign_up">
            <a className="px-10 py-4 font-bold bg-yellow-300 rounded-lg shadow-sm">
              Sign up
            </a>
          </Link>
        </div>
      </div>
      {/* First Content Block */}
      <div
        className="grid grid-flow-col p-16"
        style={{ gridTemplateColumns: "2fr 3fr" }}
      >
        {/* Text Area */}
        <div className="flex items-center w-full">
          <h1 className="font-extrabold leading-normal text-gray-800 text-8xl">
            Schedule your day with your friends.
          </h1>
        </div>
        {/* Image Area */}
        <div className="justify-self-end">
          <Image src={ScheduleImage} height={1000} width={1200} />
        </div>
      </div>
    </main>
  );
};

export default Landing;
