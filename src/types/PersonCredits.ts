export interface PersonCredits {
  cast: Cast[];
  id: number;
}

export interface Cast {
  id: number;
  release_date: string;
  title: string;
  character: string;
  credit_id: string;
}
