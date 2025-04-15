import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-quiz-navigation',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './quiz-navigation.component.html',
  styleUrls: ['./quiz-navigation.component.scss']
})
export class QuizNavigationComponent {
  @Input() currentIndex: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() hasSelectedAnswer: boolean = false;

  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  onPrevious(): void {
    this.previous.emit();
  }

  onNext(): void {
    this.next.emit();
  }

  get isFirstQuestion(): boolean {
    return this.currentIndex === 0;
  }

  get isLastQuestion(): boolean {
    return this.currentIndex >= this.totalQuestions - 1;
  }
}
