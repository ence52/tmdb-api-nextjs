"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import MediaCard from "@/components/MediaCard";
import { fetchSeriesWithGenre } from "@/services/GenreService";
import { Media } from "@/types/Media";
import { MediaCardProps } from "@/types/MediaCardProps";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SeriesGenrePage = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [series, setMovies] = useState<Media[]>([]);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetchSeriesWithGenre(Number(id));

        setMovies(res);
      } catch (error) {
        console.error("error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="w-full h-full content-center text-center">
      {series.length === 0 ? (
        <p className="text-2xl">{id}</p>
      ) : (
        <div className="grid md:grid-cols-5 grid-cols-2  md:gap-4 gap-2 py-10">
          {series.map((movie, i) => (
            <MediaCard
              key={i}
              media={movie as MediaCardProps}
              mediaType={"tv"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeriesGenrePage;
