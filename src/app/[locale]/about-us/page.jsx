"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const AboutUs = () => {
  // const router = useRouter();

  return (
    <div className="w-100 h-100 flex justify-center items-center flex-col mt-72 gap-10">
      <h2 className="text-4xl text-orange-500">About Us</h2>
      <Link className="text-2xl text-blue-700" href="/">
        HomePage
      </Link>

      <Link className="text-2xl text-blue-700" href="/en/">
        [En] Home
      </Link>
      <Link className="text-2xl text-blue-700" href="/en/faq">
        FAQ
      </Link>
    </div>
  );
};

export default AboutUs;
