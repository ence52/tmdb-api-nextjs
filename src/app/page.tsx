"use client";
import {
  fetchNowOnCinemasMovies,
  fetchUpcomingMovies,
} from "@/services/MovieService";
import { Media } from "@/types/Media";
import React, { useEffect, useState } from "react";

import MediaSlider from "../components/MediaSlider";
import { fetchPopularMedia } from "@/services/MediaService";
import LoadingSpinner from "@/components/LoadingSpinner";
import BigSlider from "@/components/BigSlider";
const Main = () => {
  const [movies, setPopularMovies] = useState<Media[]>([]);
  const [movies3, setUpcomingMovies] = useState<Media[]>([]);
  const [movies4, setNowPlayingMovies] = useState<Media[]>([]);
  const [popularSeries, setPopularSeries] = useState<Media[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [popular, upcoming, now_playing, popularSeries] =
          await Promise.all([
            fetchPopularMedia("movie"),
            fetchUpcomingMovies("movie"),
            fetchNowOnCinemasMovies(),
            fetchPopularMedia("tv"),
          ]);

        if (popular?.results) setPopularMovies(popular.results);

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
    return <LoadingSpinner />;
  }
  return (
    <div className="flex flex-col pb-20">
      <BigSlider />
      <p className="text-2xl md:text-4xl font-bold md:mt-10 mt-4 tracking-widest">
        Movies
      </p>
      <MediaSlider mediaType="movie" title="Popular" medias={movies} />
      <MediaSlider mediaType="movie" title="Upcoming" medias={movies3} />
      <MediaSlider mediaType="movie" title="Now Playing" medias={movies4} />
      <p className="text-2xl md:text-4xl font-semibold mt-10 tracking-widest">
        TV Shows
      </p>
      <MediaSlider
        mediaType="tv"
        title="Popular Series"
        medias={popularSeries}
      />
    </div>
  );
};

export default Main;
