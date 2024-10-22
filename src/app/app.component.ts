import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import { increment, decrement, reset } from '../store/progress.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  progress$ = this.store.select('progress');

  constructor(private store: Store<{ progress: number }>) {}

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  ngOnInit(): void {
    this.store.select('progress').subscribe((val) => {
      console.log(val)
    })
  }
}
