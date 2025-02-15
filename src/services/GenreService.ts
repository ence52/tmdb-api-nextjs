import { Genre, Genres } from "@/types/Genre";
import { axiosClient } from "./Constants";
import { Media, MediaResult } from "@/types/Media";

export const fetchMovieGenres = async (): Promise<Genre[]> => {
  try {
    const response = await axiosClient.get<Genres>(`/genre/movie/list`);
    return response.data.genres;
  } catch {
    throw new Error(`Failed to fetch movie genres.`);
  }
};
export const fetchSeriesGenres = async (): Promise<Genre[]> => {
  try {
    const response = await axiosClient.get<Genres>(`/genre/tv/list`);
    return response.data.genres;
  } catch {
    throw new Error(`Failed to fetch series genres.`);
  }
};
export const fetchMovieWithGenre = async (id: number): Promise<Media[]> => {
  try {
    const response = await axiosClient.get<MediaResult>(
      `/discover/movie?with_genres=${id}`
    );
    console.log(response.data.results + "//////////////////////");
    return response.data.results;
  } catch {
    throw new Error(`Failed to fetch movie with genre.`);
  }
};
export const fetchSeriesWithGenre = async (id: number): Promise<Media[]> => {
  try {
    const response = await axiosClient.get<MediaResult>(
      `/discover/tv?with_genres=${id}`
    );
    console.log(response.data.results + "//////////////////////");
    return response.data.results;
  } catch {
    throw new Error(`Failed to fetch series with genre.`);
  }
};
