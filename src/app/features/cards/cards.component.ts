import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Card} from "primeng/card";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, Card ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  // Twój kod
}
