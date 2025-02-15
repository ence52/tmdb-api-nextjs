"use client";
import React, { useState } from "react";
import MovieGenresSection from "./MovieGenresSection";
import SeriesGenresSection from "./SeriesGenresSection";

const GenresSection = () => {
  const [activeTab, setTab] = useState(0);

  return (
    <div className="hidden md:block space-y-6">
      <div className="flex space-x-4 border-b-[1px] border-themeGray py-4">
        <button
          onClick={() => setTab(0)}
          className={`text-xl px-4 hover:bg-gray-600  py-2 rounded-xl  duration-500 ${
            activeTab === 0 ? `bg-slate-700` : ``
          }`}
        >
          Movie
        </button>
        <button
          onClick={() => setTab(1)}
          className={`text-xl px-4 hover:bg-gray-600  py-2 rounded-xl  duration-500 ${
            activeTab === 1 ? `bg-slate-700` : ``
          }`}
        >
          Series
        </button>
        {/* Movies */}
      </div>
      {activeTab === 0 && <MovieGenresSection />}
      {activeTab === 1 && <SeriesGenresSection />}
    </div>
  );
};

export default GenresSection;
