import {createAction, props} from "@ngrx/store";

export const deleteTodo = createAction(
  '[Food App] Delete Todo',
  props<{ id: number }>()
)

export const selectedFoodOptions = createAction(
  '[Food App] Selected Food Options',
  props<{ questionIndex: number; answer: string }>()
)

export const updateProgress = createAction(
  '[Food App] Update Progress',
  props<{ progress: number }>()
);

export const finishSurvey = createAction(
  '[Survey] Finish Survey'
);
