import {Action, createReducer, on} from '@ngrx/store';
import {finishSurvey, increment, selectedFoodOptions, updateProgress} from './card.actions';
import {state} from '@angular/animations';

export function counterReducer(state = 0, action: Action) {
  switch (action.type) {
    default: return state + 33.4;
  }
}
