"use client";
import {
  fetchMediaImagesById,
  fetchMediaVideos,
} from "@/services/MediaService";
import {
  fetchSeriesCredits,
  fetchSeriesDetails,
} from "@/services/SeriesService";
import { Credits } from "@/types/MediaCredits";
import { MediaImages } from "@/types/MediaImages";
import { Keyword } from "@/types/MediaKeywords";
import { VideoResult } from "@/types/MediaVideos";
import { SeriesDetails } from "@/types/SeriesDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSeriesDetails = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [details, setDetails] = useState<SeriesDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [images, setImages] = useState<MediaImages | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [videos, setVideos] = useState<VideoResult[]>([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [details, credits, videos, images] = await Promise.all([
          fetchSeriesDetails(Number(id)),
          fetchSeriesCredits(Number(id)),
          fetchMediaVideos(Number(id), "tv"),
          fetchMediaImagesById(Number(id), "tv"),
        ]);

        setDetails(details);
        setCredits(credits);
        setVideos(videos);
        setImages(images);
      } catch (error) {
        console.log("error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    console.log(details);
  }, []);

  return { details, isLoading, credits, keywords, images, videos };
};
