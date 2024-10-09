import { Component } from '@angular/core';
import {MatProgressBar} from '@angular/material/progress-bar';
import {State, Store} from '@ngrx/store';

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
  progress = 0;
  isFinished = false;
  currentQuestionIndex = 0;
  question: string = ''
  currentQuestion: any;

  constructor(private store: Store<any>) {
  }

  questions = [
    { question: 'Ile osób?', options: ['Solo', 'Para', 'Grupa'] },
    { question: 'Rodzaj kuchni?', options: ['Włoska', 'Azjatycka', 'Polska', 'Indyjska'] },
    { question: 'Atmosfera?', options: ['Rodzinna', 'Ekskluzywna', 'Bar'] }
  ];

  selectCard(question: string) {

  }
}
