import { Component } from '@angular/core';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatProgressBar
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  question: string = ''

  selectCard(question: string) {

  }
}
