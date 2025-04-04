import {createAction, props} from "@ngrx/store";

export const selectedFoodOptions = createAction(
  '[Food App] Selected Food Options',
  props<{ questionIndex: number; answer: string }>()
)

export const updateProgress = createAction(
  '[Progress] Update Progress',
  props<{ progress: number }>()
);

export const finishSurvey = createAction(
  '[Survey] Finish Survey'
);

export const increment = createAction(
  '[Increment] Increment Value'
)
