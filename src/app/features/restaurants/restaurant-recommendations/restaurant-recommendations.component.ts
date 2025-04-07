import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { RestaurantRecommendation, RecommendationRequest, AnswerSubmission } from '../../../core/interfaces/restaurant.interface';

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
    // Tutaj możesz załadować zapisane odpowiedzi użytkownika z localStorage lub innego źródła
    this.loadSavedAnswers();
  }

  loadSavedAnswers(): void {
    // Przykładowa implementacja - w rzeczywistości powinieneś załadować odpowiedzi z serwisu lub localStorage
    const savedAnswers = localStorage.getItem('userAnswers');
    if (savedAnswers) {
      this.userAnswers = JSON.parse(savedAnswers);
      if (this.userAnswers.length > 0) {
        this.getRecommendations();
      }
    }
  }

  getRecommendations(): void {
    if (this.userAnswers.length === 0) {
      this.error = 'Brak odpowiedzi do wygenerowania rekomendacji.';
      return;
    }

    this.loading = true;
    this.error = null;

    const request: RecommendationRequest = {
      answers: this.userAnswers,
      // Możesz dodać user_id lub session_id, jeśli są dostępne
      session_id: localStorage.getItem('sessionId') || this.generateSessionId()
    };

    this.restaurantService.getRecommendations(request).subscribe({
      next: (response) => {
        this.recommendations = response.recommendations;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Nie udało się załadować rekomendacji. Spróbuj ponownie później.';
        this.loading = false;
        console.error('Error loading recommendations:', err);
      }
    });
  }

  private generateSessionId(): string {
    const sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('sessionId', sessionId);
    return sessionId;
  }

  // Metoda do dodawania odpowiedzi użytkownika
  addAnswer(answer: AnswerSubmission): void {
    // Sprawdź, czy już istnieje odpowiedź na to pytanie
    const existingIndex = this.userAnswers.findIndex(a => a.question_id === answer.question_id);
    
    if (existingIndex >= 0) {
      // Aktualizuj istniejącą odpowiedź
      this.userAnswers[existingIndex] = answer;
    } else {
      // Dodaj nową odpowiedź
      this.userAnswers.push(answer);
    }
    
    // Zapisz odpowiedzi w localStorage
    localStorage.setItem('userAnswers', JSON.stringify(this.userAnswers));
  }

  // Metoda do czyszczenia odpowiedzi użytkownika
  clearAnswers(): void {
    this.userAnswers = [];
    localStorage.removeItem('userAnswers');
    this.recommendations = [];
  }
}
