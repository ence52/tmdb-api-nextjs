"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import MediaSlider from "@/components/MediaSlider";
import { fetchPopularMedia } from "@/services/MediaService";
import {
  fetchMoviesTopRated,
  fetchNowOnCinemasMovies,
  fetchUpcomingMovies,
} from "@/services/MovieService";

import { Media } from "@/types/Media";
import React, { useEffect, useState } from "react";

const MoviesPage = () => {
  const [nowPlaying, setNowPlaying] = useState<Media[]>([]);
  const [popular, setPopular] = useState<Media[]>([]);
  const [toprated, setToprated] = useState<Media[]>([]);
  const [upcoming, setUpcoming] = useState<Media[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [nowPlaying, popular, toprated, upcoming] = await Promise.all([
          (await fetchNowOnCinemasMovies()).results,
          (await fetchPopularMedia("movie")).results,
          fetchMoviesTopRated(),
          (await fetchUpcomingMovies("movie")).results,
        ]);

        setNowPlaying(nowPlaying);
        setPopular(popular);
        setToprated(toprated);
        setUpcoming(upcoming);
      } catch (error) {
        console.log("error", error);
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
      <MediaSlider mediaType="movie" title="On Cinemas" medias={nowPlaying} />
      <MediaSlider mediaType="movie" title="Popular" medias={popular} />
      <MediaSlider mediaType="movie" title="Top Rated" medias={toprated} />
      <MediaSlider mediaType="movie" title="Upcoming" medias={upcoming} />
    </div>
  );
};

export default MoviesPage;
