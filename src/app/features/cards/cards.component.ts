import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from "primeng/card";
import { Button } from "primeng/button";
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { animate, style, transition, trigger } from "@angular/animations";
import {
  Caa0baf44bc64c9b94a44e9ed5bc418d200ResponseInner as Question,
  Fd2c54c83721116cef0ad4b94134932b200ResponseInner as Answer,
  Restaurant as BaseApiRestaurant
} from "../../core/api/api";

// Rozszerzamy interfejs ApiRestaurant o pole match_score
interface ApiRestaurant extends BaseApiRestaurant {
  match_score?: number;
  match_people_count?: number;
  match_price_per_person?: number;
  match_meal_type?: number;
  match_visit_purpose?: number;
  match_dietary_preferences?: number;
}

import { firstValueFrom } from 'rxjs';
import { RestaurantService } from '../../core/services/restaurant.service';
import { Restaurant, RestaurantRecommendation, AnswerSubmission } from '../../core/interfaces/restaurant.interface';

// Bazowy URL do API
const API_BASE_URL = 'http://127.0.0.1:8000';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    Card,
    Button,
    RadioButtonModule,
    FormsModule
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CardsComponent implements OnInit {
  questions: Question[] = [];
  answers: Answer[] = [];
  restaurants: ApiRestaurant[] = [];
  selectedAnswers: (Answer | null)[] = [];
  currentQuestionIndex = 0;
  showResults = false;
  showAllRestaurants = false;
  loading = true;
  error: string | null = null;
  Math = Math; // Aby móc używać Math w szablonie

  constructor(private http: HttpClient, private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      this.loading = true;
      this.error = null;

      // Load questions using HttpClient
      this.questions = await firstValueFrom(
        this.http.get<Question[]>(`${API_BASE_URL}/api/questions`)
      );

      // Load answers using HttpClient
      this.answers = await firstValueFrom(
        this.http.get<Answer[]>(`${API_BASE_URL}/api/answers`)
      );

      // Load restaurants using HttpClient - tylko jedno wywołanie API
      const apiRestaurants = await firstValueFrom(
        this.restaurantService.getRestaurants()
      );

      // Zapisujemy restauracje jako ApiRestaurant[] (bez konwersji)
      this.restaurants = apiRestaurants as ApiRestaurant[];

      // Przygotuj rekomendacje od razu po załadowaniu danych
      this.prepareRecommendations(this.restaurants);

      // Initialize selectedAnswers array with nulls
      this.selectedAnswers = new Array(this.questions.length).fill(null);

      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = 'Nie udało się załadować danych. Spróbuj ponownie później.';
      console.error('Error loading data:', error);
    }
  }

  getCurrentQuestion(): Question | null {
    if (this.questions.length === 0 || this.currentQuestionIndex >= this.questions.length) {
      return null;
    }
    return this.questions[this.currentQuestionIndex];
  }

  filteredAnswers(): Answer[] {
    const currentQuestion = this.getCurrentQuestion();
    if (!currentQuestion) return [];

    return this.answers.filter(answer =>
      answer.question_id === currentQuestion.id
    );
  }

  isAnswerSelected(answer: Answer): boolean {
    return this.selectedAnswers[this.currentQuestionIndex]?.id === answer.id;
  }

  setSelectedAnswer(answer: Answer): void {
    this.selectedAnswers[this.currentQuestionIndex] = answer;
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      // Po zakończeniu pytań pobierz rekomendacje i pokaż wyniki
      this.getRecommendations();
    }
  }

  resetQuiz(): void {
    this.selectedAnswers = new Array(this.questions.length).fill(null);
    this.currentQuestionIndex = 0;
    this.showResults = false;
    this.showAllRestaurants = false;
    this.apiRecommendations = []; // Wyczyść rekomendacje z API
  }

  // Tablica do przechowywania rekomendacji z API
  apiRecommendations: RestaurantRecommendation[] = [];

  // Metoda pomocnicza do przygotowania rekomendacji z danych restauracji
  private prepareRecommendations(restaurants: ApiRestaurant[]): void {
    if (!restaurants || restaurants.length === 0) return;

    console.log('Preparing recommendations from loaded restaurants');

    // Używamy wartości match_score bezpośrednio z API
    // Sortujemy restauracje według match_score
    const sortedRestaurants = [...restaurants].sort((a, b) => {
      // Sprawdź, czy restauracje mają pole match_score
      const scoreA = a.match_score !== undefined ? a.match_score : 0;
      const scoreB = b.match_score !== undefined ? b.match_score : 0;
      return scoreB - scoreA;
    });

    // Utwórz obiekty RestaurantRecommendation
    this.apiRecommendations = sortedRestaurants
      .slice(0, 3) // Pobierz top 3 restauracji
      .map(restaurant => {
        // Konwertuj ApiRestaurant na Restaurant
        const restaurantObj: Restaurant = {
          id: restaurant.id || 0,
          name: restaurant.name,
          address: restaurant.address,
          city: restaurant.city,
          cuisine: restaurant.cuisine,
          rating: restaurant.rating || 0,
          website: restaurant.website || '',
          created_at: restaurant.created_at,
          updated_at: restaurant.updated_at
        };

        // Używamy wartości match_score z API
        // Jeśli match_score jest liczbą między 0 a 10, konwertujemy ją na procent
        let matchScore = restaurant.match_score;
        if (matchScore !== undefined) {
          if (matchScore <= 10) {
            // Jeśli wartość jest między 0 a 10, konwertujemy na procent (0-100)
            matchScore = Math.round(matchScore * 10);
          }
        }

        return {
          restaurant: restaurantObj,
          match_score: matchScore || 0,
          matches: 0 // Domyślna wartość dla pola matches
        };
      });
  }

  // Metoda do pobierania restauracji po zakończeniu quizu
  getRecommendations(): void {
    if (this.selectedAnswers.length === 0) {
      console.log('No answers selected, cannot get restaurants');
      return;
    }

    // Pokaż wyniki
    this.showResults = true;

    // Rekomendacje są już przygotowane w loadData(), nie musimy ponownie pobierać danych
  }
}
