import { NextPage } from "next";
import Link from "next/link";
import ScheduleImage from "../../public/svg/first_block.svg";
import Image from "next/image";
import { Menu } from "@mui/icons-material";
import { useState, MouseEvent } from "react";

const Landing: NextPage = () => {
  // * HOOKS
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // * HANDLERS
  function openMenu() {
    setIsMenuOpen(() => true);
  }

  function closeMenu(event: MouseEvent) {
    if (event.target == event.currentTarget) setIsMenuOpen(() => false);
  }

  return (
    <>
      {/* Menu Panel*/}
      {/* Overlay */}
      <div
        onClick={closeMenu}
        className={`${
          !isMenuOpen && "hidden"
        } md:hidden absolute z-40 w-full  backdrop-blur-sm h-screen`}
      >
        {/* Menu Sidebar */}
        <nav className="absolute right-0 z-50 flex flex-col w-1/2 h-screen px-4 py-8 bg-white shadow-md rounded-l-md">
          {/* Button Group */}
          <div className="flex flex-row items-center justify-evenly">
            <Link href="/sign_in">
              <a>Log in</a>
            </Link>
            <Link href="/sign_up">
              <a className="px-2 py-1 font-bold bg-yellow-300 rounded-md shadow-sm">
                Sign up
              </a>
            </Link>
          </div>
          <hr className="my-4 border-t border-gray-300 border-solid" />
          {/* Nav Group */}
          <div className="flex flex-col  gap-y-4">
            <Link href="#">
              <a>Features</a>
            </Link>
            <Link href="#">
              <a>Updates</a>
            </Link>
            <Link href="#">
              <a>Contacts</a>
            </Link>
          </div>
        </nav>
      </div>
      <main className="flex flex-col min-h-screen px-16 bg-red-50 ">
        {/* Appbar */}
        <div className="grid items-center w-full grid-cols-3 h-28 bg-red-50">
          {/* LOGO */}
          <div className="flex items-center w-12 ">
            <Link href="/landing">
              <a className="font-extrabold">YACSOK</a>
            </Link>
          </div>
          {/* MENU */}
          {/* MENU Button */}
          <div
            onClick={openMenu}
            className="block col-start-3 col-end-4 md:hidden justify-self-end"
          >
            <Menu />
          </div>
          <div className="items-center hidden md:flex justify-evenly gap-x-7 ">
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
          <div className="flex-row items-center hidden gap-8 ml-auto md:flex">
            <Link href="/sign_in">
              <a>Log in</a>
            </Link>
            <Link href="/sign_up">
              <a className="px-4 py-2 font-bold bg-yellow-300 rounded-md shadow-sm">
                Sign up
              </a>
            </Link>
          </div>
        </div>
        {/* First Hero */}
        <section className="flex flex-col-reverse items-center justify-center my-16 md:my-20 md:flex-row">
          {/* Text Area */}
          <div className="flex items-center justify-center flex-1 w-full md:justify-start">
            <h2 className="text-3xl font-extrabold leading-normal text-center text-gray-800 md:text-5xl">
              Schedule your day with your friends.
            </h2>
          </div>
          {/* Image Area */}
          <div className="flex flex-1">
            <Image src={ScheduleImage} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Landing;
