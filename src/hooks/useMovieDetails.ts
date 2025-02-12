import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieImagesById,
  fetchMovieKeywordsById,
} from "@/services/MovieService";
import { Credits, Crew } from "@/types/MovieCredits";
import { MovieDetails } from "@/types/MovieDetails";
import { MovieImages } from "@/types/MovieImages";
import { Keyword } from "@/types/MovieKeywords";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useMovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [images, setImages] = useState<MovieImages | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [details, credits, images, keywords] = await Promise.all([
          fetchMovieDetails(Number(id)),
          fetchMovieCredits(Number(id)),
          fetchMovieImagesById(Number(id)),
          fetchMovieKeywordsById(Number(id)),
        ]);
        setDetails(details);
        setCredits(credits);
        setImages(images);
        setKeywords(keywords);
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
    isLoading,
    directorInfo,
    writerInfo,
    starsInfo,
    formatDuration,
  };
};
