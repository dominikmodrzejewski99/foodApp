import { Component, OnInit, signal, computed, effect, Signal, inject } from '@angular/core';
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
  // Stan aplikacji jako Signals
  questions = signal<Question[]>([]);
  answers = signal<Answer[]>([]);
  restaurants = signal<ApiRestaurant[]>([]);
  selectedAnswers = signal<(Answer | null)[]>([]);
  currentQuestionIndex = signal<number>(0);
  showResults = signal<boolean>(false);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Computed values
  currentQuestion = computed(() => {
    const questions = this.questions();
    const index = this.currentQuestionIndex();
    return questions.length > 0 && index < questions.length ? questions[index] : null;
  });

  hasSelectedAnswer = computed(() => {
    const answers = this.selectedAnswers();
    const index = this.currentQuestionIndex();
    return answers.length > index && answers[index] !== null;
  });

  filteredAnswers = computed(() => {
    const currentQ = this.currentQuestion();
    const allAnswers = this.answers();
    if (!currentQ) return [];
    return allAnswers.filter(a => a.question_id === currentQ.id);
  });

  constructor(private http: HttpClient, private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Load questions using HttpClient
      const questions = await firstValueFrom(
        this.http.get<Question[]>(`${API_BASE_URL}/api/questions`)
      );
      this.questions.set(questions);

      // Load answers using HttpClient
      const answers = await firstValueFrom(
        this.http.get<Answer[]>(`${API_BASE_URL}/api/answers`)
      );
      this.answers.set(answers);

      // Load restaurants using HttpClient - tylko jedno wywołanie API
      const apiRestaurants = await firstValueFrom(
        this.restaurantService.getRestaurants()
      );

      // Zapisujemy restauracje jako ApiRestaurant[] (bez konwersji)
      this.restaurants.set(apiRestaurants as ApiRestaurant[]);

      // Przygotuj rekomendacje od razu po załadowaniu danych
      this.prepareRecommendations(this.restaurants());

      // Initialize selectedAnswers array with nulls
      this.selectedAnswers.set(new Array(this.questions().length).fill(null));

      this.loading.set(false);
    } catch (error) {
      this.loading.set(false);
      this.error.set('Nie udało się załadować danych. Spróbuj ponownie później.');
      console.error('Error loading data:', error);
    }
  }

  // Metoda getCurrentQuestion została zastąpiona przez computed property currentQuestion

  // Metoda filteredAnswers została zastąpiona przez computed property filteredAnswers

  isAnswerSelected(answer: Answer): boolean {
    const answers = this.selectedAnswers();
    const index = this.currentQuestionIndex();
    return answers[index]?.id === answer.id;
  }

  setSelectedAnswer(answer: Answer): void {
    // Jeśli kliknięto już zaznaczoną odpowiedź, odznacz ją
    const currentAnswers = this.selectedAnswers();
    const index = this.currentQuestionIndex();

    if (currentAnswers[index]?.id === answer.id) {
      // Tworzymy nową kopię tablicy, aby zachować immutability
      const newAnswers = [...currentAnswers];
      newAnswers[index] = null;
      this.selectedAnswers.set(newAnswers);
    } else {
      // W przeciwnym razie zaznacz nową odpowiedź
      const newAnswers = [...currentAnswers];
      newAnswers[index] = answer;
      this.selectedAnswers.set(newAnswers);
    }
  }

  previousQuestion(): void {
    const currentIndex = this.currentQuestionIndex();
    if (currentIndex > 0) {
      this.currentQuestionIndex.set(currentIndex - 1);
    }
  }

  nextQuestion(): void {
    const currentIndex = this.currentQuestionIndex();
    const questionsLength = this.questions().length;

    if (currentIndex < questionsLength - 1) {
      this.currentQuestionIndex.set(currentIndex + 1);
    } else {
      // Po zakończeniu pytań pobierz rekomendacje i pokaż wyniki
      this.showResults.set(true);
      this.getRecommendations();
    }
  }

  resetQuiz(): void {
    this.selectedAnswers.set(new Array(this.questions().length).fill(null));
    this.currentQuestionIndex.set(0);
    this.showResults.set(false);
    this.apiRecommendations.set([]); // Wyczyść rekomendacje z API
  }

  /**
   * Opens a map with the restaurant location
   */
  openMap(restaurant: Restaurant): void {
    if (!restaurant || !restaurant.address || !restaurant.city) {
      console.error('Brak danych adresowych dla restauracji:', restaurant);
      return;
    }

    try {
      const address = encodeURIComponent(`${restaurant.address}, ${restaurant.city}`);
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
      window.open(mapUrl, '_blank');
    } catch (error) {
      console.error('Błąd podczas otwierania mapy:', error);
    }
  }

  // Tablica do przechowywania rekomendacji z API jako Signal
  apiRecommendations = signal<RestaurantRecommendation[]>([]);

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
    const recommendations = sortedRestaurants
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

    // Aktualizuj signal
    this.apiRecommendations.set(recommendations);
  }

  // Metoda do pobierania restauracji po zakończeniu quizu
  getRecommendations(): void {
    console.log('getRecommendations called');
    const selectedAnswers = this.selectedAnswers();
    if (selectedAnswers.length === 0) {
      console.log('No answers selected, cannot get restaurants');
      return;
    }

    // Pokaż wyniki
    this.showResults.set(true);
    this.loading.set(true);
    console.log('showResults in getRecommendations:', this.showResults());

    // Zbierz ID wybranych odpowiedzi
    const answerIds = selectedAnswers
      .filter(answer => answer !== null) // Usuń puste odpowiedzi
      .map(answer => answer!.id!); // Pobierz ID odpowiedzi

    console.log('Selected answer IDs:', answerIds);

    // Pobierz dopasowane restauracje z API
    this.restaurantService.getMatchingRestaurants(answerIds).subscribe({
      next: (restaurants) => {
        console.log('Matching restaurants received:', restaurants);

        // Wypisz wartości match_score dla debugowania
        console.log('Match scores before processing:', restaurants.map(r => r.match_score));

        // Konwertuj otrzymane restauracje na format RestaurantRecommendation
        // Pobierz tylko top 3 restauracje
        const recommendations = restaurants
          .slice(0, 3) // Pobierz tylko top 3 restauracje
          .map(restaurant => {
            // Konwertuj wartość match_score na procent jeśli potrzeba
            let matchScore = restaurant.match_score;
            console.log(`Processing restaurant ${restaurant.name}, original match_score:`, matchScore);

            // Jeśli match_score jest undefined lub null, ustaw na 50 (wartość domyślna)
            if (matchScore === undefined || matchScore === null) {
              console.log(`Setting default match_score for ${restaurant.name}`);
              matchScore = 50;
            } else if (matchScore <= 1) {
              // Jeśli wartość jest między 0 a 1, konwertujemy na procent (0-100)
              console.log(`Converting match_score from 0-1 scale to percentage for ${restaurant.name}`);
              matchScore = Math.round(matchScore * 100);
            } else if (matchScore <= 10) {
              // Jeśli wartość jest między 0 a 10, konwertujemy na procent (0-100)
              console.log(`Converting match_score from 0-10 scale to percentage for ${restaurant.name}`);
              matchScore = Math.round(matchScore * 10);
            }

            console.log(`Final match_score for ${restaurant.name}:`, matchScore);

            return {
              restaurant: restaurant,
              match_score: matchScore,
              matches: 0 // Domyślna wartość dla pola matches
            };
          });

        // Aktualizuj signal z rekomendacjami
        this.apiRecommendations.set(recommendations);

        // Wypisz finalne rekomendacje
        console.log('Final recommendations:', recommendations);
        console.log('apiRecommendations after update:', this.apiRecommendations());
        console.log('showResults before loading set to false:', this.showResults());
        this.loading.set(false);
        console.log('showResults after loading set to false:', this.showResults());
      },
      error: (err) => {
        console.error('Error getting matching restaurants:', err);
        this.loading.set(false);
        this.error.set('Nie udało się pobrać dopasowanych restauracji. Spróbuj ponownie później.');

        // Fallback - użyj domyślnych rekomendacji
        this.prepareRecommendations(this.restaurants());
      }
    });
  }
}
