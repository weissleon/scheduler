import { NextPage } from "next";
import Link from "next/link";

const Landing: NextPage = () => {
  return (
    <main className="flex flex-col min-h-screen bg-red-50 ">
      {/* Appbar */}
      <div className="grid w-screen grid-cols-3 px-12 h-28 bg-red-50">
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
            <a className="px-10 py-4 font-bold bg-yellow-200 rounded-lg shadow-sm">
              Sign up
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Landing;
