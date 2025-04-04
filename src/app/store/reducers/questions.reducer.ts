import { createReducer, on, Action } from '@ngrx/store';
import { setSelectedOption } from './card.actions';

export interface Question {
  id: number;
  question: string;
  options: string[];
  selectedOption: string | null;
}

export interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: [
    {
      id: 1,
      question: 'Wybierz typ kuchni',
      options: ['Włoska', 'Chińska', 'Indyjska', 'Amerykańska', 'Meksykańska'],
      selectedOption: null
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
  ]
};

const questionsReducer = createReducer(
  initialState,
  on(setSelectedOption, (state, { questionId, selectedOption }) => ({
    ...state,
    questions: state.questions.map(question =>
      question.id === questionId ? { ...question, selectedOption } : question
    )
  }))
);

export function reducer(state: QuestionsState | undefined, action: Action) {
  return questionsReducer(state, action);
}
