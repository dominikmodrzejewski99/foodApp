import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './progress.actions';

export const initialState = 0;

const _progresReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);

export function progresReducer(state: any, action: any) {
  return _progresReducer(state, action);
}
