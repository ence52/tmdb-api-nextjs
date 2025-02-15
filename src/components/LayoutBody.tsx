"use client";
import {
  faClapperboard,
  faBars,
  faHome,
  faTvAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import GenresSection from "./GenresSection";
import SearchBar from "./SearchBar";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  variable: "--font-geist-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

function LayoutBody({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuActive, setActive] = useState(false);
  return (
    <body className={`${workSans.className} antialiased md:grid grid-cols-6`}>
      <div className="col-span-1 bg-themeBlack flex-col h-full px-8 space-y-10 md:py-10 pt-10">
        <div className="flex items-center justify-between ">
          <div className="flex md:space-x-4 items-center">
            {" "}
            <FontAwesomeIcon icon={faClapperboard} className="w-12" />
            <Link
              href="/"
              className="text-4xl font-semibold flex tracking-wide"
            >
              FilmScope
            </Link>
          </div>
          <button
            className="md:hidden block "
            onClick={() => setActive(!isMenuActive)}
          >
            {isMenuActive ? (
              <FontAwesomeIcon icon={faXmark} className="h-6" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="h-6" />
            )}
          </button>
        </div>
        <div
          className={`space-y-6 ${isMenuActive ? `block` : `md:block hidden`}`}
        >
          {/* Menu Section */}
          <div className="flex-col  flex">
            <p className="text-3xl font-semibold mb-2">Menu</p>
            <Link href="/" className="navbar-btn">
              <FontAwesomeIcon icon={faHome} className="w-6" />
              <p>Home</p>
            </Link>
            <Link href="/movies" className="navbar-btn">
              <FontAwesomeIcon icon={faClapperboard} className="w-6" />
              <p>Movies</p>
            </Link>
            <Link href="/series" className="navbar-btn">
              <FontAwesomeIcon icon={faTvAlt} className="w-6" />
              <p>Series</p>
            </Link>
          </div>
        </div>
        {/* Genres */}
        <GenresSection />
      </div>
      <div className="col-span-5 md:px-10 px-2">
        <SearchBar />
        {children}
      </div>
    </body>
  );
}

export default LayoutBody;
