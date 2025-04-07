import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant, RecommendationRequest, RecommendationResponse } from '../interfaces/restaurant.interface';

// Bazowy URL do API
const API_BASE_URL = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = `${API_BASE_URL}/api`; // Pełny URL do API

  constructor(private http: HttpClient) { }

  /**
   * Pobiera wszystkie restauracje
   */
  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`);
  }

  /**
   * Pobiera szczegóły restauracji o podanym ID
   */
  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/restaurants/${id}`);
  }

  /**
   * Pobiera rekomendacje restauracji na podstawie odpowiedzi użytkownika
   */
  getRecommendations(request: RecommendationRequest): Observable<RecommendationResponse> {
    return this.http.post<RecommendationResponse>(`${this.apiUrl}/recommendations`, request);
  }

  /**
   * Pobiera popularne restauracje (z TikToka)
   */
  getPopularRestaurants(): Observable<Restaurant[]> {
    // Filtrujemy restauracje po stronie klienta, ponieważ backend nie ma dedykowanego endpointu
    return new Observable<Restaurant[]>(observer => {
      this.getRestaurants().subscribe({
        next: (restaurants) => {
          const popularRestaurants = restaurants.filter(r => r.is_tiktok_recommended)
            .sort((a, b) => (b.popularity_score || 0) - (a.popularity_score || 0));
          observer.next(popularRestaurants);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}
