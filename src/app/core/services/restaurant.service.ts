import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Restaurant,
  RecommendationRequest,
  RecommendationResponse,
  MatchingRequest,
  MatchingResponse
} from '../interfaces/restaurant.interface';

// Bazowy URL do API
const API_BASE_URL = 'http://127.0.0.1:8000';
const MATCHING_API_URL = 'http://127.0.0.1:8004';

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
    // Tymczasowo wyłączamy żądanie POST na endpoint /recommendations
    // i zamiast tego pobieramy restauracje za pomocą GET z /restaurants
    // i obliczamy match_score lokalnie
    return new Observable<RecommendationResponse>(observer => {
      this.getRestaurants().subscribe({
        next: (restaurants) => {
          // Przykładowa logika obliczania match_score
          const recommendations = restaurants
            .map(restaurant => ({
              restaurant,
              match_score: Math.floor(Math.random() * 100), // Losowa wartość match_score
              matches: 0
            }))
            .sort((a, b) => b.match_score - a.match_score)
            .slice(0, 5); // Pobierz top 5 restauracji

          observer.next({ recommendations });
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  /**
   * Pobiera dopasowane restauracje na podstawie ID odpowiedzi
   * @param answerIds Tablica ID odpowiedzi
   */
  getMatchingRestaurants(answerIds: number[]): Observable<Restaurant[]> {
    const request: MatchingRequest = {
      answer_ids: answerIds
    };

    console.log(`Sending matching request to ${MATCHING_API_URL}/api/matching with answer_ids:`, answerIds);

    return new Observable<Restaurant[]>(observer => {
      // Wysyłamy żądanie POST do endpointu /api/matching
      this.http.post<MatchingResponse>(`${MATCHING_API_URL}/api/matching`, request).subscribe({
        next: (response) => {
          console.log('Matching API response received:', response);

          // Sprawdź format odpowiedzi
          if (response && Array.isArray(response)) {
            // Odpowiedź jest tablicą - używamy jej bezpośrednio
            console.log('Response is an array, using directly');
            observer.next(response as unknown as Restaurant[]);
            observer.complete();
          } else if (response && response.restaurants && Array.isArray(response.restaurants)) {
            // Odpowiedź ma pole restaurants, które jest tablicą
            console.log('Response has restaurants array, using it');
            observer.next(response.restaurants);
            observer.complete();
          } else {
            // Nieznany format odpowiedzi
            console.error('Unknown response format:', response);
            observer.error(new Error('Unknown API response format'));
          }
        },
        error: (err) => {
          console.error('Error getting matching restaurants:', err);

          // Fallback: pobierz wszystkie restauracje i przypisz losowe wartości match_score
          console.log('Using fallback: getting all restaurants and assigning random match scores');
          this.getRestaurants().subscribe({
            next: (restaurants) => {
              // Przypisz losowe wartości match_score
              const restaurantsWithScores = restaurants.map(restaurant => {
                // Generuj losową wartość między 30 a 100 (aby uniknąć zbyt niskich wartości)
                const randomScore = Math.floor(Math.random() * 70) + 30; // Losowa wartość 30-100
                console.log(`Assigning random match_score ${randomScore} to ${restaurant.name}`);
                return {
                  ...restaurant,
                  match_score: randomScore
                };
              });

              // Sortuj według match_score i pobierz top 3
              restaurantsWithScores.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));

              // Zwracamy tylko top 3 restauracje
              observer.next(restaurantsWithScores.slice(0, 3));
              observer.complete();
            },
            error: (fallbackErr) => {
              console.error('Fallback also failed:', fallbackErr);
              observer.error(err); // Zwróć oryginalny błąd
            }
          });
        }
      });
    });
  }
}
