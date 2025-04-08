import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { Restaurant } from '../../../core/interfaces/restaurant.interface';

@Component({
  selector: 'app-matching-test',
  templateUrl: './matching-test.component.html',
  styleUrls: ['./matching-test.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class MatchingTestComponent implements OnInit {
  answerIds: number[] = [1, 5, 9, 13, 17]; // Domyślne wartości
  answerIdsInput: string = '1, 5, 9, 13, 17';
  restaurants: Restaurant[] = [];
  loading = false;
  error: string | null = null;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    // Możemy od razu załadować restauracje z domyślnymi wartościami
    this.getMatchingRestaurants();
  }

  /**
   * Parsuje wprowadzone ID odpowiedzi i pobiera dopasowane restauracje
   */
  getMatchingRestaurants(): void {
    this.loading = true;
    this.error = null;

    try {
      // Parsuj wprowadzone ID odpowiedzi
      this.answerIds = this.answerIdsInput
        .split(',')
        .map(id => id.trim())
        .filter(id => id !== '')
        .map(id => parseInt(id, 10));

      // Sprawdź, czy wszystkie wartości są liczbami
      if (this.answerIds.some(isNaN)) {
        throw new Error('Wszystkie ID muszą być liczbami');
      }

      // Pobierz dopasowane restauracje
      this.restaurantService.getMatchingRestaurants(this.answerIds).subscribe({
        next: (restaurants) => {
          this.restaurants = restaurants;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Nie udało się pobrać dopasowanych restauracji. Spróbuj ponownie później.';
          this.loading = false;
          console.error('Error loading matching restaurants:', err);
        }
      });
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Nieprawidłowy format ID odpowiedzi';
      this.loading = false;
    }
  }
}
