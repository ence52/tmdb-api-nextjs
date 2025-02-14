export interface Result {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
}

export interface Media {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  original_language: string;
  first_air_date?: string;
  release_date?: string;
}
