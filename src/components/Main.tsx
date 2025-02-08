"use client";
import {
  fetchPopularMovies,
  fetchTrendMovies,
  fetchUpcomingMovies,
} from "@/lib/api/MovieService";
import { Movie } from "@/types/Movie";
import React, { useEffect, useState } from "react";

import MovieSlider from "./MovieSlider";
const Main = () => {
  const [movies, setPopularMovies] = useState<Movie[]>([]);
  const [movies2, setTrendingMovies] = useState<Movie[]>([]);
  const [movies3, setUpcomingMovies] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const popular = await fetchPopularMovies();
        const trending = await fetchTrendMovies();
        const upcoming = await fetchUpcomingMovies();

        setPopularMovies(popular.results);
        setTrendingMovies(trending.results);
        setUpcomingMovies(upcoming.results);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    <div>LOADING</div>;
  }
  return (
    <div className="flex flex-col">
      <MovieSlider title="Popular Movies" movies={movies} />
      <MovieSlider title="Trending Movies" movies={movies2} />
      <MovieSlider title="Upcoming Movies" movies={movies3} />
    </div>
  );
};

export default Main;
