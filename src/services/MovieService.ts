import { Result } from "@/types/Media";
import { Credits } from "@/types/MediaCredits";
import { MovieDetails } from "@/types/MovieDetails";
import { axiosClient } from "./Constants";

export const fetchUpcomingMovies = async (type: string): Promise<Result> => {
  try {
    const response = await axiosClient.get<Result>(`/${type}/upcoming`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch upcoming ${type}s.`);
  }
};
export const fetchNowOnCinemasMovies = async (): Promise<Result> => {
  try {
    const response = await axiosClient.get<Result>("/movie/now_playing");
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
