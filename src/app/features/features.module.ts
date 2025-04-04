import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import {Card} from "primeng/card";



@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    Card
  ]
})
export class FeaturesModule { }
