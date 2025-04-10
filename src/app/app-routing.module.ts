import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import standalone components for routing
import { RestaurantListComponent } from './features/restaurants/restaurant-list/restaurant-list.component';
import { RestaurantRecommendationsComponent } from './features/restaurants/restaurant-recommendations/restaurant-recommendations.component';
import { CardsComponent } from './features/cards/cards.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  { path: 'cards', component: CardsComponent },
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'recommendations', component: RestaurantRecommendationsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
