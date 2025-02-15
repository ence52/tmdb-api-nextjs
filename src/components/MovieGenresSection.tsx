"use client";
import { fetchMovieGenres } from "@/services/GenreService";
import { Genre } from "@/types/Genre";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MovieGenresSection = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchMovieGenres();

        setGenres(res);
      } catch (error) {
        console.log("erorr:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {genres.map((genre, i) => (
        <Link key={i} href={`/genre/movie/${genre.id}`} className="navbar-btn">
          <p>{genre.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default MovieGenresSection;
