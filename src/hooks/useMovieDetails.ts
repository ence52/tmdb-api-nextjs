import { fetchMovieDetails } from "@/services/MovieService";
import { Credits, Crew } from "@/types/MediaCredits";
import { MovieDetails } from "@/types/MovieDetails";
import { Keyword } from "@/types/MediaKeywords";
import { VideoResult } from "@/types/MediaVideos";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  fetchMediaCredits,
  fetchMediaImagesById,
  fetchMediaKeywordsById,
  fetchMediaVideos,
} from "@/services/MediaService";
import { MediaImages } from "@/types/MediaImages";

export const useMovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [images, setImages] = useState<MediaImages | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [videos, setVideos] = useState<VideoResult[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [details, credits, images, keywords, videos] = await Promise.all([
          fetchMovieDetails(Number(id)),
          fetchMediaCredits(Number(id), "movie"),
          fetchMediaImagesById(Number(id), "movie"),
          fetchMediaKeywordsById(Number(id), "movie"),
          fetchMediaVideos(Number(id), "movie"),
        ]);
        setDetails(details);
        setCredits(credits);
        setImages(images);
        setKeywords(keywords);
        setVideos(videos);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const directorInfo = credits?.crew.find(
    (person: Crew) => person.job === "Director"
  );
  const writerInfo = credits?.crew.find(
    (person: Crew) => person.job === "Story" || person.job === "Writer"
  );
  const starsInfo = credits?.cast.slice(0, 4);

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  return {
    details,
    credits,
    images,
    keywords,
    videos,
    isLoading,
    directorInfo,
    writerInfo,
    starsInfo,
    formatDuration,
  };
};
