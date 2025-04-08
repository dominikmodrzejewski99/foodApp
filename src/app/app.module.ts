import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { HttpClientModule, provideHttpClient } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from "@ngrx/store";
import { MatProgressBar } from "@angular/material/progress-bar";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { counterReducer } from "./store/reducers/card.reducer";
import { CoreModule } from "./core/core.module";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

// Standalone components
import { CardsComponent } from "./features/cards/cards.component";
import { RestaurantRecommendationsComponent } from "./features/restaurants/restaurant-recommendations/restaurant-recommendations.component";
import { RestaurantListComponent } from "./features/restaurants/restaurant-list/restaurant-list.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    StoreModule.forRoot({counter: counterReducer}),
    CoreModule,
    // Material components
    MatProgressBar,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    // PrimeNG components
    ButtonModule,
    TableModule,
    // Standalone components
    CardsComponent,
    RestaurantListComponent,
    RestaurantRecommendationsComponent
  ],
  providers: [
    provideHttpClient(),
    provideClientHydration(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


