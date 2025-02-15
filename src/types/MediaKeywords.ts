export interface MediaKeywords {
  id: number;
  keywords?: Keyword[];
  results?: Keyword[];
}

export interface Keyword {
  id: number;
  name: string;
}
