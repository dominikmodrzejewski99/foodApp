import {Action, createReducer, on} from '@ngrx/store';
import {state} from '@angular/animations';

export function counterReducer(state = 0, action: Action) {
  switch (action.type) {
    default: return state + 33.4;
  }
}
