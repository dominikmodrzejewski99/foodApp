import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {progresReducer} from "../store/progress.reducer";
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import {HttpClientModule} from "@angular/common/http";
import { CardsComponent } from './components/cards/cards.component';
import {Button} from "primeng/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({progress: progresReducer}, {}),
    EffectsModule.forRoot([]),
    Button
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
