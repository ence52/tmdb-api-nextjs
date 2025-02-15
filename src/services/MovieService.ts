import { Media, MediaResult } from "@/types/Media";
import { MovieDetails } from "@/types/MovieDetails";
import { axiosClient } from "./Constants";

export const fetchUpcomingMovies = async (
  type: string
): Promise<MediaResult> => {
  try {
    const response = await axiosClient.get<MediaResult>(`/${type}/upcoming`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch upcoming ${type}s.`);
  }
};
export const fetchNowOnCinemasMovies = async (): Promise<MediaResult> => {
  try {
    const response = await axiosClient.get<MediaResult>("/movie/now_playing");
    return response.data;
  } catch {
    throw new Error("Failed to fetch now playing movies.");
  }
};

export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  try {
    const response = await axiosClient.get<MovieDetails>(`/movie/${id}`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch movie details for ID: ${id}.`);
  }
};

export const fetchMoviesTopRated = async (): Promise<Media[]> => {
  try {
    const response = await axiosClient.get<MediaResult>(`/movie/top_rated`);
    return response.data.results;
  } catch {
    throw new Error(`Failed to fetch movies top rated.`);
  }
};
