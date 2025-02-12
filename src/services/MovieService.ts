import { Result } from "@/types/Movie";
import { Credits } from "@/types/MovieCredits";
import { MovieDetails } from "@/types/MovieDetails";
import { axiosClient } from "./Constants";
import { MovieImages } from "@/types/MovieImages";
import { Keyword, MovieKeywords } from "@/types/MovieKeywords";
import { MovieVideos, VideoResult } from "@/types/MovieVideos";

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

export const fetchMovieCredits = async (id: number): Promise<Credits> => {
  try {
    const response = await axiosClient.get<Credits>(`/movie/${id}/credits`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch movie credits for ID: ${id}.`);
  }
};

export const fetchMovieImagesById = async (
  id: number
): Promise<MovieImages> => {
  try {
    const response = await axiosClient.get<MovieImages>(`/movie/${id}/images`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch movie images for ID: ${id}.`);
  }
};
export const fetchMovieKeywordsById = async (
  id: number
): Promise<Keyword[]> => {
  try {
    const response = await axiosClient.get<MovieKeywords>(
      `/movie/${id}/keywords`
    );
    return response.data.keywords;
  } catch {
    throw new Error(`Failed to fetch movie keywords for ID: ${id}.`);
  }
};
export const fetchMovieVideos = async (id: number): Promise<VideoResult[]> => {
  try {
    const response = await axiosClient.get<MovieVideos>(`/movie/${id}/videos`);
    return response.data.results;
  } catch {
    throw new Error(`Failed to fetch movie videos for ID: ${id}.`);
  }
};
