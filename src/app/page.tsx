"use client";
import {
  fetchNowOnCinemasMovies,
  fetchUpcomingMovies,
} from "@/services/MovieService";
import { Media } from "@/types/Media";
import React, { useEffect, useState } from "react";

import MovieSlider from "../components/MediaSlider";
import { fetchPopularMedia, fetchTrendMedia } from "@/services/MediaService";
const Main = () => {
  const [movies, setPopularMovies] = useState<Media[]>([]);
  const [movies2, setTrendingMovies] = useState<Media[]>([]);
  const [movies3, setUpcomingMovies] = useState<Media[]>([]);
  const [movies4, setNowPlayingMovies] = useState<Media[]>([]);
  const [popularSeries, setPopularSeries] = useState<Media[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [popular, trending, upcoming, now_playing, popularSeries] =
          await Promise.all([
            fetchPopularMedia("movie"),
            fetchTrendMedia("movie"),
            fetchUpcomingMovies("movie"),
            fetchNowOnCinemasMovies(),
            fetchPopularMedia("tv"),
          ]);

        if (popular?.results) setPopularMovies(popular.results);
        if (trending?.results) setTrendingMovies(trending.results);
        if (upcoming?.results) setUpcomingMovies(upcoming.results);
        if (now_playing?.results) setNowPlayingMovies(now_playing.results);
        if (popularSeries?.results) setPopularSeries(popularSeries.results);
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
      <MovieSlider mediaType="movie" title="Popular Movies" medias={movies} />
      <MovieSlider mediaType="movie" title="Trending Movies" medias={movies2} />
      <MovieSlider mediaType="movie" title="Upcoming Movies" medias={movies3} />
      <MovieSlider mediaType="movie" title="Now Playing" medias={movies4} />
      <MovieSlider
        mediaType="tv"
        title="Popular Series"
        medias={popularSeries}
      />
    </div>
  );
};

export default Main;
