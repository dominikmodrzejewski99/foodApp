import {Component, OnInit} from '@angular/core';
import {Restaurant} from "../../interfaces/restaurants";
import {RestaurantsService} from "../../services/restaurants.service";

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.scss'
})
export class RestaurantListComponent implements OnInit{
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((data: Restaurant[]) => {
      this.restaurants = data;
    console.log(this.restaurants)
    });
  }
}
