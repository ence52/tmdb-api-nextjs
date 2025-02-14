export interface SearchResults {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchResult {
  id: number;
  name?: string;
  poster_path?: string;
  media_type: string;
  profile_path?: string;
  title?: string;
}
