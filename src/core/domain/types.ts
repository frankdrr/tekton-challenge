export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  synopsis?: string;
}

export interface JikanApiResponse {
  pagination: {
    has_next_page: boolean;
    current_page: number;
  };
  data: Anime[];
}
