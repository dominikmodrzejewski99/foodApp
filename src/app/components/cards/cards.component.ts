import { Component } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  questions = [
    {
      id: 1,
      title: 'Pytanie nr 1',
      text: 'W ile osób idziecie jeść?',
      options: ['Sam', 'Para', '3-4', '5-6']
    },
    {
      id: 2,
      title: 'Pytanie nr 2',
      text: 'Czy preferujesz dania mięsne czy wegetariańskie?',
      options: ['Mięsne', 'Wegetariańskie', 'Bez znaczenia']
    },
    {
      id: 3,
      title: 'Pytanie nr 3',
      text: 'Jaki jest Twój budżet na osobę?',
      options: ['< 20 zł', '20-40 zł', '40-60 zł', '60+ zł']
    },
    {
      id: 4,
      title: 'Pytanie nr 4',
      text: 'Czy masz jakieś alergie lub nietolerancje pokarmowe?',
      options: ['Brak', 'Gluten', 'Laktoza', 'Orzechy']
    }
  ];

  selectedAnswers: { [key: number]: string } = {};

  selectAnswer(questionId: number, answer: string) {
    this.selectedAnswers[questionId] = answer;
  }

}
