import {createReducer, on} from '@ngrx/store';
import {finishSurvey, selectedFoodOptions, updateProgress} from './actions';

export interface State {
  progressValue: number;
  selectedFoodOptions: string[];
  isFinished: boolean;
}

const initialState: State = {
  progressValue: 0,
  selectedFoodOptions: [],
  isFinished: false,
};


export interface Restaurant {
  id: number;
  name: string;
  url: string,
  photo: string
  capacity: number
  priceRange: string;
  typeCuisine: string;
  atmosphere: string
}

// const Reducer = createReducer(
//   initialState,
//   // on(
//   //   TodoListActions.addTodo,
//   //   (state, action) => ({
//   //     ...state,
//   //     todos: state.todos.concat({...action.todo})
//   //   })
//   // ),
// )

const Reducer = createReducer(
  initialState,
  on(selectedFoodOptions, (state, { questionIndex, answer }) => ({
    ...state,
    answers: [...state.selectedFoodOptions.slice(0, questionIndex), answer]
  })),
  on(updateProgress, (state, { progress }) => ({
    ...state,
    progress
  })),
  on(finishSurvey, (state) => ({
    ...state,
    isFinished: true
  }))
);
