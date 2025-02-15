import { SeriesDetails } from "@/types/SeriesDetails";
import { axiosClient } from "./Constants";
import { Credits } from "@/types/MediaCredits";
import { Media, MediaResult } from "@/types/Media";

export const fetchSeriesDetails = async (
  id: number
): Promise<SeriesDetails> => {
  try {
    const response = await axiosClient.get<SeriesDetails>(`/tv/${id}`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch series details for ID: ${id}.`);
  }
};

export const fetchSeriesCredits = async (id: number): Promise<Credits> => {
  try {
    const response = await axiosClient.get<Credits>(`/tv/${id}/credits`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch series details for ID: ${id}.`);
  }
};
export const fetchSeriesAiringToday = async (): Promise<Media[]> => {
  try {
    const response = await axiosClient.get<MediaResult>(`/tv/airing_today`);
    return response.data.results;
  } catch {
    throw new Error(`Failed to fetch series airing today.`);
  }
};
export const fetchSeriesOnTheAir = async (): Promise<Media[]> => {
  try {
    const response = await axiosClient.get<MediaResult>(`/tv/on_the_air`);
    return response.data.results;
  } catch {
    throw new Error(`Failed to fetch series on the air.`);
  }
};
export const fetchSeriesPopular = async (): Promise<Media[]> => {
  try {
    const response = await axiosClient.get<MediaResult>(`/tv/popular`);
    return response.data.results;
  } catch {
    throw new Error(`Failed to fetch series popular.`);
  }
};
export const fetchSeriesTopRated = async (): Promise<Media[]> => {
  try {
    const response = await axiosClient.get<MediaResult>(`/tv/top_rated`);
    return response.data.results;
  } catch {
    throw new Error(`Failed to fetch series top rated.`);
  }
};
