import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { Restaurant, RestaurantRecommendation, RecommendationRequest, AnswerSubmission } from '../../../core/interfaces/restaurant.interface';

@Component({
  selector: 'app-restaurant-recommendations',
  templateUrl: './restaurant-recommendations.component.html',
  styleUrls: ['./restaurant-recommendations.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class RestaurantRecommendationsComponent implements OnInit {
  recommendations: RestaurantRecommendation[] = [];
  loading = false;
  error: string | null = null;
  userAnswers: AnswerSubmission[] = [];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
  }

  getRecommendations(): void {
    if (this.userAnswers.length === 0) {
      this.error = 'Brak odpowiedzi do wygenerowania rekomendacji.';
      return;
    }

    this.loading = true;
    this.error = null;

    this.restaurantService.getRestaurants().subscribe({
      next: (restaurants) => {
        const scoredRestaurants = this.calculateMatchScores(restaurants);

        this.recommendations = scoredRestaurants
          .sort((a, b) => b.score - a.score)
          .slice(0, 5) // Pobierz top 5 restauracji
          .map(item => ({
            restaurant: item.restaurant,
            match_score: item.score,
            matches: 0 // Domyślna wartość dla pola matches
          }));

        this.loading = false;
      },
      error: (err) => {
        this.error = 'Nie udało się załadować restauracji. Spróbuj ponownie później.';
        this.loading = false;
        console.error('Error loading restaurants:', err);
      }
    });
  }

  private generateSessionId(): string {
    const sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('sessionId', sessionId);
    return sessionId;
  }
  clearAnswers(): void {
    this.userAnswers = [];
    localStorage.removeItem('userAnswers');
    this.recommendations = [];
  }

  private calculateMatchScores(restaurants: Restaurant[]): { restaurant: Restaurant, score: number }[] {
    return restaurants.map(restaurant => {
      let score = 0;

      // Przykładowa logika obliczania match_score na podstawie odpowiedzi użytkownika
      // Możesz dostosować tę logikę do swoich potrzeb

      // Przykład: jeśli użytkownik wybrał kuchnię włoską, a restauracja ma kuchnię włoską, dodaj punkty
      this.userAnswers.forEach(answer => {
        // Sprawdź, czy odpowiedź dotyczy kuchni
        if (answer.question_id === 1) { // Załóżmy, że pytanie o kuchnię ma id=1
          if (answer.answer_id === 1 && restaurant.cuisine.toLowerCase().includes('włoska')) { // Załóżmy, że odpowiedź "włoska" ma id=1
            score += 30;
          } else if (answer.answer_id === 2 && restaurant.cuisine.toLowerCase().includes('azjatycka')) { // Załóżmy, że odpowiedź "azjatycka" ma id=2
            score += 30;
          }
          // Dodaj więcej warunków dla innych kuchni
        }

        // Sprawdź, czy odpowiedź dotyczy ceny
        if (answer.question_id === 2) { // Załóżmy, że pytanie o cenę ma id=2
          if (answer.answer_id === 1 && restaurant.price_level && restaurant.price_level <= 2) { // Załóżmy, że odpowiedź "tanie" ma id=1
            score += 20;
          } else if (answer.answer_id === 2 && restaurant.price_level && restaurant.price_level === 3) { // Załóżmy, że odpowiedź "średnie" ma id=2
            score += 20;
          } else if (answer.answer_id === 3 && restaurant.price_level && restaurant.price_level >= 4) { // Załóżmy, że odpowiedź "drogie" ma id=3
            score += 20;
          }
        }

        // Dodaj więcej warunków dla innych pytań
      });

      // Dodaj punkty za wysoką ocenę
      if (restaurant.rating >= 4.5) {
        score += 20;
      } else if (restaurant.rating >= 4.0) {
        score += 10;
      }

      // Dodaj punkty za popularność na TikToku
      if (restaurant.is_tiktok_recommended) {
        score += 10;
      }

      // Dodaj mały losowy komponent, aby uniknąć remisów
      score += Math.random() * 5;

      return { restaurant, score };
    });
  }
}
