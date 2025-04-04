import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import { increment} from './store/card.actions';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent implements OnInit{
  counter$ = this.store.select('counter');

  questions = [
    {
      id: 1,
      question: 'Wybierz typ kuchni',
      options: ['Włoska', 'Chińska', 'Indyjska', 'Amerykańska', 'Meksykańska'],
      selectedOption: null // do przechowywania wybranej opcji
    },
    {
      id: 2,
      question: 'Wybierz zakres cenowy',
      options: ['$', '$$', '$$$', '$$$$'],
      selectedOption: null
    },
    {
      id: 3,
      question: 'Wybierz klimat lokalu',
      options: ['Elegancki', 'Casual', 'Rodzinny', 'Romantyczny'],
      selectedOption: null
    }
  ];

  constructor(private store: Store<{ counter: number }>) {}

  increment() {
    this.store.dispatch(increment());
  }

  ngOnInit(): void {
    this.store.select('counter').subscribe((val) => {
      console.log(val)
    })
  }
}
