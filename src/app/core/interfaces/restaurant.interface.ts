export interface Restaurant {
  id: number;
  name: string;
  address: string;
  city: string;
  cuisine: string;
  rating: number;
  website: string;
  description?: string;
  image_url?: string;
  price_level?: number;
  is_tiktok_recommended?: boolean;
  popularity_score?: number;
  created_at?: string;
  match_score?: number;
  updated_at?: string;
}

export interface RestaurantRecommendation {
  restaurant: Restaurant;
  match_score: number;
  matches: number;
}

export interface RecommendationResponse {
  recommendations: RestaurantRecommendation[];
}

export interface AnswerSubmission {
  question_id: number;
  answer_id: number;
}

export interface RecommendationRequest {
  user_id?: number;
  session_id?: string;
  answers: AnswerSubmission[];
}

/**
 * Interfejs dla żądania dopasowania restauracji na podstawie ID odpowiedzi
 */
export interface MatchingRequest {
  answer_ids: number[];
}

/**
 * Interfejs dla odpowiedzi z dopasowanymi restauracjami
 */
export interface MatchingResponse {
  restaurants: Restaurant[];
}
