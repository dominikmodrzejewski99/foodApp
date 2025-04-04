import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';




import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config'; import Aura from '@primeng/themes/aura';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {StoreModule} from "@ngrx/store";
import {MatProgressBar} from "@angular/material/progress-bar";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {counterReducer} from "./store/reducers/card.reducer";
import {CoreModule} from "./core/core.module";
import {CardsComponent} from "./features/cards/cards.component";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    StoreModule.forRoot({counter: counterReducer}),
    MatProgressBar,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    CoreModule,
    ButtonModule,
    TableModule,
    CardsComponent,
    CardsComponent
  ],
  providers: [
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


