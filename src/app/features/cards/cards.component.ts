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
  Restaurant
} from "../../core/api/api";
import { firstValueFrom } from 'rxjs';

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
  restaurants: Restaurant[] = [];
  selectedAnswers: (Answer | null)[] = [];
  currentQuestionIndex = 0;
  showResults = false;
  showAllRestaurants = false;
  loading = true;
  error: string | null = null;
  Math = Math; // Aby móc używać Math w szablonie

  constructor(private http: HttpClient) { }

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
      
      // Load restaurants using HttpClient
      this.restaurants = await firstValueFrom(
        this.http.get<Restaurant[]>(`${API_BASE_URL}/api/restaurants`)
      );
      
      // Initialize selectedAnswers array with nulls
      this.selectedAnswers = new Array(this.questions.length).fill(null);
      
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = 'Nie udało się załadować danych. Spróbuj ponownie później.';
      console.error('Error loading data:', error);
    }
  }

  // Metody do obsługi pytań
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
      this.showResults = true;
    }
  }

  resetQuiz(): void {
    this.selectedAnswers = new Array(this.questions.length).fill(null);
    this.currentQuestionIndex = 0;
    this.showResults = false;
    this.showAllRestaurants = false;
  }

  // Metody do rekomendacji restauracji
  getRecommendedRestaurants(): Restaurant[] {
    if (!this.restaurants || this.restaurants.length === 0) return [];
    
    const preferences = this.getUserPreferences();
    
    // Filter and score restaurants based on user preferences
    const scoredRestaurants = this.restaurants.map(restaurant => {
      let score = 0;
      
      // Score based on cuisine match
      if (preferences.cuisines.length > 0 && restaurant.cuisine) {
        if (preferences.cuisines.some(cuisine => restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase()))) {
          score += 3;
        }
      }
      
      // Score based on price range
      if (preferences.priceRange && restaurant.rating) {
        if (preferences.priceRange === 'niski' && restaurant.rating <= 3) score += 2;
        if (preferences.priceRange === 'średni' && restaurant.rating > 3 && restaurant.rating <= 4) score += 2;
        if (preferences.priceRange === 'wysoki' && restaurant.rating > 4) score += 2;
      }
      
      // Bonus points for high ratings
      if (restaurant.rating && restaurant.rating > 4) score += 1;
      
      return { restaurant, score };
    });
    
    // Sort by score (descending) and return top 3
    return scoredRestaurants
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.restaurant);
  }

  getUserPreferences(): { cuisines: string[], priceRange: string, occasion: string } {
    const cuisines: string[] = [];
    let priceRange = '';
    let occasion = '';
    
    this.selectedAnswers.forEach(answer => {
      if (!answer || !answer.answer_text) return;
      
      const answerText = answer.answer_text.toLowerCase();
      
      // Extract cuisine preferences
      if (answerText.includes('włoska')) cuisines.push('włoska');
      if (answerText.includes('azjatycka')) cuisines.push('azjatycka');
      if (answerText.includes('polska')) cuisines.push('polska');
      if (answerText.includes('amerykańska')) cuisines.push('amerykańska');
      if (answerText.includes('meksykańska')) cuisines.push('meksykańska');
      
      // Extract price range
      if (answerText.includes('do 50 zł')) priceRange = 'niski';
      if (answerText.includes('50-100 zł')) priceRange = 'średni';
      if (answerText.includes('powyżej 100 zł')) priceRange = 'wysoki';
      
      // Extract occasion
      if (answerText.includes('romantyczna')) occasion = 'romantyczna kolacja';
      if (answerText.includes('biznesowa')) occasion = 'spotkanie biznesowe';
      if (answerText.includes('rodzinna')) occasion = 'wyjście rodzinne';
      if (answerText.includes('ze znajomymi')) occasion = 'spotkanie ze znajomymi';
    });
    
    return { cuisines, priceRange, occasion };
  }
}
