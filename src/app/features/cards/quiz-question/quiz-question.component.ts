import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  Caa0baf44bc64c9b94a44e9ed5bc418d200ResponseInner as Question,
  Fd2c54c83721116cef0ad4b94134932b200ResponseInner as Answer
} from '../../../core/api/api';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [
    CommonModule,
    Card,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class QuizQuestionComponent {
  @Input() question: Question | null = null;
  @Input() answers: Answer[] = [];
  @Input() selectedAnswer: Answer | null = null;
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Input() currentIndex: number = 0;
  @Input() totalQuestions: number = 0;

  @Output() answerSelected = new EventEmitter<Answer>();
  @Output() retryLoading = new EventEmitter<void>();

  isAnswerSelected(answer: Answer): boolean {
    return this.selectedAnswer?.id === answer.id;
  }

  setSelectedAnswer(answer: Answer): void {
    this.answerSelected.emit(answer);
  }
}
