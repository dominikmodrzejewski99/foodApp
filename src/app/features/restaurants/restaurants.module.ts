import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Ponieważ komponenty są teraz standalone, nie musimy ich deklarować w module
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class RestaurantsModule { }
