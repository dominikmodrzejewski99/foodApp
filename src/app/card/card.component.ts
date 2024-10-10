import { Component } from '@angular/core';
import {MatProgressBar} from '@angular/material/progress-bar';
import {State, Store} from '@ngrx/store';
import {NgForOf} from "@angular/common";
import {finishSurvey, selectedFoodOptions, updateProgress} from "../store/actions";

@Component({
  selector: 'app-card',
  standalone: true,
    imports: [
        MatProgressBar,
        NgForOf
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

    selectCard(option: string) {
        this.store.dispatch(
            selectedFoodOptions({ questionIndex: this.currentQuestionIndex, answer: option })
        );

        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.store.dispatch(updateProgress({ progress: this.progress }));

        if (this.currentQuestionIndex <= this.questions.length - 1) {
            this.currentQuestionIndex++;
        } else {
            this.store.dispatch(finishSurvey());
        }
    }
}
