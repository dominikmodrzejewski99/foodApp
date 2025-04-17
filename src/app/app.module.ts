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
import { CoreModule } from "./core/core.module";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

// Standalone components
import { CardsComponent } from "./features/cards/cards.component";
import { RestaurantRecommendationsComponent } from "./features/restaurants/restaurant-recommendations/restaurant-recommendations.component";
import { RestaurantListComponent } from "./features/restaurants/restaurant-list/restaurant-list.component";
import { FaqComponent } from "./features/faq/faq.component";
import { AboutComponent } from "./features/about/about.component";

// PrimeNG components
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

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
    AccordionModule,
    CardModule,
    DividerModule,
    // Standalone components
    CardsComponent,
    RestaurantListComponent,
    RestaurantRecommendationsComponent,
    FaqComponent,
    AboutComponent
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


