"use client";
import MovieCard from "@/components/MovieCard";
import { fetchSearchMovies } from "@/lib/api/SearchService";
import { Movie } from "@/types/Movie";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchSearch = async () => {
      if (!query) return;

      const res = await fetchSearchMovies(query);
      setMovies(res);
    };
    fetchSearch();
    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="grid grid-cols-5 gap-4 py-10">
      {movies.map((i) => (
        <MovieCard key={i.id} movie={i} />
      ))}
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
