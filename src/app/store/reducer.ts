import {createReducer} from '@ngrx/store';

export interface State {
  progressValue: number;
  selectedFoodOptions: string[];
}

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
