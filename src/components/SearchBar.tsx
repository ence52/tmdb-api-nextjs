"use client";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState<string | null>(null);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    if (query !== null) {
      router.replace("/");
    }

    if (query?.trim()) {
      router.push(`/search?q=${query}`);
    }
  }, [query, router]);

  if (!isClient) {
    return null;
  }
  return (
    <div className="flex flex-col-reverse md:flex-row md:space-x-8 space-y-4 md:space-y-0 items-center bg-themeBlack   md:pt-12">
      <div className="relative w-full ">
        <input
          className="search-bar "
          placeholder="Search movies, series, person..."
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <FontAwesomeIcon
          icon={faSearch}
          size="lg"
          className=" absolute h-6 right-6 top-1/2 transform md:-translate-y-1/2 text-gray-400 "
        />
      </div>
      <div className=" space-x-6 items-center flex-none md:flex hidden">
        <FontAwesomeIcon icon={faBell} className="h-6" />
        <Image
          className=" h-12 w-12 rounded-full"
          alt="avatar"
          unoptimized
          src={"/images/avatar.jpg"}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default SearchBar;
