"use client";
import MovieCard from "@/components/MovieCard";
import { fetchSearchMovies } from "@/services/SearchService";
import { Movie } from "@/types/Movie";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    if (!query) return;
    const fetchSearch = async () => {
      const res = await fetchSearchMovies(query);

      setMovies(res);
    };
    fetchSearch();
    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="w-full h-full content-center text-center">
      {movies.length === 0 ? (
        <p className="text-2xl">Film not found</p>
      ) : (
        <div className="grid md:grid-cols-5 grid-cols-2  md:gap-4 gap-2 py-10">
          {movies.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading search...</p>}>
      <Search />
    </Suspense>
  );
}
