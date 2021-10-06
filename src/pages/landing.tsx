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
        <nav className="bg-white py-8 px-4 rounded-l-md shadow-md flex flex-col absolute h-screen right-0 z-50 w-1/2">
          {/* Button Group */}
          <div className="flex flex-row justify-evenly items-center">
            <Link href="/sign_in">
              <a>Log in</a>
            </Link>
            <Link href="/sign_up">
              <a className="px-2 py-1 font-bold bg-yellow-300 rounded-md shadow-sm">
                Sign up
              </a>
            </Link>
          </div>
          <hr className="border-solid my-4 border-t border-gray-300" />
          {/* Nav Group */}
          <div className=" flex flex-col gap-y-4">
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
      <main className="px-16 flex flex-col min-h-screen  bg-red-50 ">
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
            className="col-start-3 col-end-4 block md:hidden justify-self-end"
          >
            <Menu />
          </div>
          <div className="hidden md:flex items-center justify-evenly gap-x-7 ">
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
          <div className="hidden md:flex flex-row items-center gap-8 ml-auto">
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
        <section className="my-16 md:my-20 flex flex-col-reverse md:flex-row items-center justify-center">
          {/* Text Area */}
          <div className="flex flex-1 items-center justify-center md:justify-start w-full">
            <h2 className="font-extrabold text-center leading-normal text-gray-800 text-3xl md:text-5xl">
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
