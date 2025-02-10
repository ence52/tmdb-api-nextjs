import { Result } from "@/types/Movie";
import { Credits } from "@/types/MovieCredits";
import { MovieDetails } from "@/types/MovieDetails";
import { axiosClient } from "./Constants";

export const fetchPopularMovies = async (): Promise<Result> => {
  try {
    const response = await axiosClient.get<Result>("/movie/popular");
    return response.data;
  } catch {
    throw new Error("Failed to fetch popular movies.");
  }
};

export const fetchTrendMovies = async (): Promise<Result> => {
  try {
    const response = await axiosClient.get<Result>("/trending/movie/week");
    return response.data;
  } catch {
    throw new Error("Failed to fetch trending movies.");
  }
};

export const fetchUpcomingMovies = async (): Promise<Result> => {
  try {
    const response = await axiosClient.get<Result>("/movie/upcoming");
    return response.data;
  } catch {
    throw new Error("Failed to fetch upcoming movies.");
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

export const fetchMovieCredits = async (id: number): Promise<Credits> => {
  try {
    const response = await axiosClient.get<Credits>(`/movie/${id}/credits`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch movie credits for ID: ${id}.`);
  }
};
