import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CardComponent} from './card/card.component';
import {BackgroundComponent} from './background/background.component';
import {RestaurantsService} from './services/restaurants.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, BackgroundComponent, HttpClientModule, CommonModule],
  providers: [RestaurantsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'foodApp';

  constructor(private restaurantsService: RestaurantsService) {
  }
  ngOnInit() {
    // this.restaurantsService.getRestaurants().subscribe((value) => {
    //   console.log(value)
    // })
  }
}
