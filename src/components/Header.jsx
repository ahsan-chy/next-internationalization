import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/images/404.png";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between px-4 lg:px-6 h-14">
        <Link href="/" className="">
          <Image src={logo} width={38} alt="Logo-image" />
        </Link>
        <div className="flex justify-end gap-3 items-center">
          <nav className="flex gap-4 sm:gap-6 items-center">
            <Link
              className="text-sm font-medium border-b-2 border-transparent transition duration-300  hover:border-gray-400 hover:border-b-2"
              href="/">
              Home
            </Link>
            <Link
              className="text-sm font-medium border-b-2 border-transparent transition duration-300  hover:border-gray-400 hover:border-b-2"
              href="/en">
              [EN] Home
            </Link>
            <Link
              className="text-sm font-medium border-b-2 border-transparent transition duration-300  hover:border-gray-400 hover:border-b-2"
              href="/en/about-us">
              About Us
            </Link>
            <Link
              className="text-sm font-medium border-b-2 border-transparent transition duration-300  hover:border-gray-400 hover:border-b-2"
              href="/en/faq">
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
