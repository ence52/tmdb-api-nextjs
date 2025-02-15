import { Result } from "@/types/Media";
import { axiosClient } from "./Constants";
import { Credits } from "@/types/MediaCredits";
import { Keyword, MediaKeywords } from "@/types/MediaKeywords";
import { MediaVideos, VideoResult } from "@/types/MediaVideos";
import { MediaImages } from "@/types/MediaImages";

export const fetchPopularMedia = async (type: string): Promise<Result> => {
  try {
    const response = await axiosClient.get<Result>(`/${type}/popular`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch popular ${type}s.`);
  }
};

export const fetchTrendMedia = async (type: string): Promise<Result> => {
  try {
    const response = await axiosClient.get<Result>(`/trending/${type}/week`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch trend ${type}s.`);
  }
};

export const fetchMediaCredits = async (
  id: number,
  type: string
): Promise<Credits> => {
  try {
    const response = await axiosClient.get<Credits>(`/${type}/${id}/credits`);
    return response && response.data;
  } catch {
    throw new Error(`Failed to fetch media credits for ID: ${id}.`);
  }
};

export const fetchMediaImagesById = async (
  id: number,
  type: string
): Promise<MediaImages> => {
  try {
    const response = await axiosClient.get<MediaImages>(
      `/${type}/${id}/images`
    );

    return response && response.data;
  } catch {
    throw new Error(`Failed to fetch media images for ID: ${id}.`);
  }
};

export const fetchMediaKeywordsById = async (
  id: number,
  type: string
): Promise<Keyword[]> => {
  try {
    const response = await axiosClient.get<MediaKeywords>(
      `/${type}/${id}/keywords`
    );
    return type === "tv" ? response.data.results! : response.data.keywords!;
  } catch {
    throw new Error(`Failed to fetch media keywords for ID: ${id}.`);
  }
};

export const fetchMediaVideos = async (
  id: number,
  type: string
): Promise<VideoResult[]> => {
  try {
    const response = await axiosClient.get<MediaVideos>(
      `/${type}/${id}/videos`
    );
    return response && response.data.results;
  } catch {
    throw new Error(`Failed to fetch media videos for ID: ${id}.`);
  }
};
