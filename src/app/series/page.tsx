"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import MediaSlider from "@/components/MediaSlider";
import {
  fetchSeriesAiringToday,
  fetchSeriesOnTheAir,
  fetchSeriesPopular,
  fetchSeriesTopRated,
} from "@/services/SeriesService";
import { Media } from "@/types/Media";
import React, { useEffect, useState } from "react";

const SeriesPage = () => {
  const [airToday, setAirToday] = useState<Media[]>([]);
  const [onTheAir, setOnTheAir] = useState<Media[]>([]);
  const [popular, setPopular] = useState<Media[]>([]);
  const [toprated, setToprated] = useState<Media[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [airToday, onTheAir, popular, toprated] = await Promise.all([
          fetchSeriesAiringToday(),
          fetchSeriesOnTheAir(),
          fetchSeriesPopular(),
          fetchSeriesTopRated(),
        ]);

        setAirToday(airToday);
        setOnTheAir(onTheAir);
        setPopular(popular);
        setToprated(toprated);
      } catch (error) {
        console.log("error:", error);
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
      <MediaSlider mediaType="tv" title="Air Today" medias={airToday} />
      <MediaSlider mediaType="tv" title="Popular" medias={popular} />
      <MediaSlider mediaType="tv" title="Top Rated" medias={toprated} />
      <MediaSlider mediaType="tv" title="On The Air" medias={onTheAir} />
    </div>
  );
};

export default SeriesPage;
