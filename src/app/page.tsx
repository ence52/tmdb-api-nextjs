"use client";
import {
  fetchNowOnCinemasMovies,
  fetchPopularMovies,
  fetchTrendMovies,
  fetchUpcomingMovies,
} from "@/services/MovieService";
import { Movie } from "@/types/Movie";
import React, { useEffect, useState } from "react";

import MovieSlider from "../components/MovieSlider";
const Main = () => {
  const [movies, setPopularMovies] = useState<Movie[]>([]);
  const [movies2, setTrendingMovies] = useState<Movie[]>([]);
  const [movies3, setUpcomingMovies] = useState<Movie[]>([]);
  const [movies4, setNowPlayingMovies] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [popular, trending, upcoming, now_playing] = await Promise.all([
          fetchPopularMovies(),
          fetchTrendMovies(),
          fetchUpcomingMovies(),
          fetchNowOnCinemasMovies(),
        ]);

        if (popular?.results) setPopularMovies(popular.results);
        if (trending?.results) setTrendingMovies(trending.results);
        if (upcoming?.results) setUpcomingMovies(upcoming.results);
        if (now_playing?.results) setNowPlayingMovies(now_playing.results);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>LOADING</div>;
  }
  return (
    <div className="flex flex-col">
      <MovieSlider title="Popular Movies" movies={movies} />
      <MovieSlider title="Trending Movies" movies={movies2} />
      <MovieSlider title="Upcoming Movies" movies={movies3} />
      <MovieSlider title="Now Playing" movies={movies4} />
    </div>
  );
};

export default Main;
