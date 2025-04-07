import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { Card } from "primeng/card";
import { RestaurantsModule } from './restaurants/restaurants.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    Card,
    RestaurantsModule,
    CardsComponent
  ],
  exports: [
    RestaurantsModule
  ]
})
export class FeaturesModule { }
