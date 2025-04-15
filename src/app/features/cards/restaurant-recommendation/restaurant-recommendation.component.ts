import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { animate, style, transition, trigger } from '@angular/animations';
import { RestaurantRecommendation, Restaurant } from '../../../core/interfaces/restaurant.interface';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import {PrimeTemplate} from "primeng/api";

@Component({
  selector: 'app-restaurant-recommendation',
  standalone: true,
    imports: [
        CommonModule,
        Card,
        Button,
        LoadingSpinnerComponent,
        ErrorMessageComponent,
        PrimeTemplate
    ],
  templateUrl: './restaurant-recommendation.component.html',
  styleUrls: ['./restaurant-recommendation.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RestaurantRecommendationComponent {
  @Input() recommendations: RestaurantRecommendation[] = [];
  @Input() loading: boolean = false;
  @Input() error: string | null = null;

  @Output() restart = new EventEmitter<void>();
  @Output() openMap = new EventEmitter<Restaurant>();

  onRestart(): void {
    this.restart.emit();
  }

  onOpenMap(restaurant: Restaurant): void {
    this.openMap.emit(restaurant);
  }
}
