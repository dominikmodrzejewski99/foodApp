import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../../../core/interfaces/restaurant.interface';
import { RestaurantService } from '../../../core/services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  loading = true;
  error: string | null = null;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.loading = true;
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Nie udało się załadować restauracji. Spróbuj ponownie później.';
        this.loading = false;
        console.error('Error loading restaurants:', err);
      }
    });
  }
}
