"use client";

import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
  // const router = useRouter();

  return (
    <div className="w-100 h-100 flex justify-center items-center flex-col mt-72 gap-10">
      <h2 className="text-4xl text-amber-500">Home Page</h2>
      <Link className="text-2xl text-blue-700" href="/en">
        [En] Home
      </Link>
      <Link className="text-2xl text-blue-700" href="/en/about-us">
        About Us
      </Link>
      <Link className="text-2xl text-blue-700" href="/en/faq">
        FAQ
      </Link>
    </div>
  );
}
