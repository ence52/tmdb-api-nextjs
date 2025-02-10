"use client";
import {
  faSearch,
  faEnvelope,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (query === "") {
      router.replace("/");
    }

    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }, [query]);

  return (
    <div className="flex flex-col-reverse md:flex-row md:space-x-8 space-y-4 md:space-y-0 items-center bg-themeBlack   md:pt-12">
      <div className="relative w-full ">
        <input
          className="search-bar "
          placeholder="Search here..."
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <FontAwesomeIcon
          icon={faSearch}
          className=" absolute h-6 right-6 top-1/2 transform -translate-y-1/2 text-gray-400 "
        />
      </div>
      <div className="flex space-x-6 items-center flex-none">
        <FontAwesomeIcon icon={faEnvelope} className="w-8" />
        <FontAwesomeIcon icon={faBell} className="w-6" />
        <div className="h-12 w-12 bg-purple-300 rounded-full flex-none"></div>
      </div>
    </div>
  );
};

export default SearchBar;
